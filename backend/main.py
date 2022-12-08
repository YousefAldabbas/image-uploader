from fastapi import FastAPI, File, UploadFile, HTTPException, status, Request
from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import io
import os
from random import randint
import uuid
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel
from fastapi_jwt_auth.exceptions import AuthJWTException
from core.models.user import User
from core.models.image import Image

from fastapi.responses import JSONResponse

from app.routes import routes


app = FastAPI(title="image-uploader")
app.include_router(routes,prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    app.db = AsyncIOMotorClient("mongodb://localhost:27017")["image-uploader"]
    await init_beanie(app.db, document_models=[User, Image])


class Settings(BaseModel):
    authjwt_secret_key: str = "secret"


@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
