from pydantic import BaseModel, Field
from typing import Optional


class CreateUser(BaseModel):
    username:  str = Field(None, max_length=10, min_length=4)
    password:  str


class UserInfo(BaseModel):
    username:  str

