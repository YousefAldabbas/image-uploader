import io
import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File
from starlette.responses import StreamingResponse
from pathlib import Path
from core.security import current_user
from core.models.user import User
from core.models.image import Image
from random import randint



router = APIRouter(tags=["images"])

current_file_path = Path(__file__).absolute()
image_dir_path = current_file_path.parent.parent.parent.joinpath(
    "fastapi-images/")

IMAGEDIR = os.path.abspath(image_dir_path)


@router.post("/")
async def create_upload_file(file: UploadFile = File(...), current_user: User = Depends(current_user)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    path = f"{IMAGEDIR}/{file.filename}"
    with open(path, "wb") as f:
        f.write(contents)
    print(current_user.id)
    image = Image(file_name=file.filename, path=path, user_id=current_user.id)
    await image.create()
    return image


@router.get("/",   responses={
    200: {
        "content": {"image/png": {}}
    }
}, response_class=Response)
async def read_random_file(current_user: User = Depends(current_user)):
    files = os.listdir(IMAGEDIR)
    if files == []:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="storage is empty")
    random_index = randint(0, len(files) - 1)
    path = f"{IMAGEDIR}/{files[random_index]}"
    with open(path, "rb") as f:
        image_data = f.read()
    return StreamingResponse(io.BytesIO(image_data), media_type="image/jpeg")


