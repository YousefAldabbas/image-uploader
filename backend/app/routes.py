from app.user.route import router as user_router
from app.image.route import router as image_router
from fastapi import APIRouter

routes = APIRouter()

routes.include_router(user_router,prefix="/v1/auth")
routes.include_router(image_router,prefix="/v1/images")
