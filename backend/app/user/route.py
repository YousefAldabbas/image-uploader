from fastapi import APIRouter, Depends, HTTPException
from core.security import get_password_hash, verify_password, current_user
from core.models.user import User, UserAuth, UserOut
from .serializer import UserInfo
from core.models.auth import RefreshToken
from fastapi_jwt_auth import AuthJWT

router = APIRouter(tags=["User"])


@router.post("/register", response_model=UserOut)
async def user_registration(user_auth: UserAuth):
    user = await User.by_username(user_auth.username)
    if user is not None:
        raise HTTPException(409, "User with that username already exists")
    hashed = get_password_hash(user_auth.password)
    user = User(username=user_auth.username, password=hashed)
    await user.create()
    return user


@router.post("/login")
async def login(user_auth: UserAuth, auth: AuthJWT = Depends()):
    user = await User.by_username(user_auth.username)
    if user is None:
        raise HTTPException(status_code=401, detail="Bad username or password")
    if not verify_password(user_auth.password, user.password):
        raise HTTPException(status_code=401, detail="Bad username or password")
    access_token = auth.create_access_token(subject=user.username)
    refresh_token = auth.create_refresh_token(subject=user.username)
    return RefreshToken(access_token=access_token, refresh_token=refresh_token)


@router.get("/me",response_model=UserInfo)
async def user_info(current_user: User = Depends(current_user)):
    return current_user


@router.post('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()
    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    return {"access_token": new_access_token}
