
from datetime import datetime
from typing import Optional,Any

from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr


class ImageOut(BaseModel):
    """User fields returned to the client"""

    file_name: Indexed(str, unique=True)
    path: Indexed(str, unique=True)


class Image(Document, ImageOut):
    """Image DB representation"""
    user_id: Any
    file_name: str
    path: str

    def __repr__(self) -> str:
        return f"<Image {self.file_name}>"

    def __str__(self) -> str:
        return self.file_name

    def __hash__(self) -> int:
        return hash(self.file_name)

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    @classmethod
    async def by_file_name(cls, file_name: str) -> "Image":
        """Get a user by file_name"""
        return await cls.find_one(cls.file_name == file_name)

    @classmethod
    async def get_user_images(cls, user_id) -> "Image":
        return await cls.find({"user_id": user_id})
