from fastapi import Depends,  HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from core.models.user import User
from fastapi_jwt_auth import AuthJWT

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

async def current_user(auth: AuthJWT = Depends()) -> User:
    """Returns the current authorized user"""
    auth.jwt_required()
    user = await User.by_username(auth.get_jwt_subject())
    if user is None:
        raise HTTPException(404, "Authorized user could not be found")
    return user

