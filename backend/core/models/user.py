
from datetime import datetime
from beanie import Document, Indexed
from pydantic import BaseModel


class UserAuth(BaseModel):
    """User register and login auth"""

    username: str
    password: str




class UserOut(UserAuth):
    """User fields returned to the client"""

    username: Indexed(str, unique=True)
    disabled: bool = False


class User(Document, UserAuth):
    """User DB representation"""

    password: str

    def __repr__(self) -> str:
        return f"<User {self.username}>"

    def __str__(self) -> str:
        return self.username

    def __hash__(self) -> int:
        return hash(self.username)

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    @classmethod
    async def by_username(cls, username: str) -> "User":
        """Get a user by username"""
        return await cls.find_one(cls.username == username)