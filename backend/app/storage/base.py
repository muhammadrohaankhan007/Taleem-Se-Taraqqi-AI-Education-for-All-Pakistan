import os
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Optional
from app.core.config import settings


class StorageBackend(ABC):
    """Abstract storage backend interface for lesson packs, audio, and images."""

    @abstractmethod
    async def save(self, path: str, content: bytes) -> str:
        """Saves content to the given relative path and returns storage location/URL."""
        pass

    @abstractmethod
    async def get(self, path: str) -> Optional[bytes]:
        """Retrieves content bytes from the given relative path."""
        pass

    @abstractmethod
    async def exists(self, path: str) -> bool:
        """Checks if a file exists at the given relative path."""
        pass

    @abstractmethod
    async def delete(self, path: str) -> bool:
        """Deletes file at relative path if it exists."""
        pass

    @abstractmethod
    def get_url(self, path: str) -> str:
        """Returns accessible URL or path for the resource."""
        pass

    @abstractmethod
    def is_healthy(self) -> bool:
        """Checks if storage backend is operational."""
        pass


class LocalDiskStorage(StorageBackend):
    """Local filesystem storage backend for development and container volume mounts."""

    def __init__(self, base_dir: Optional[str] = None):
        self.base_dir = Path(base_dir or getattr(settings, "STORAGE_LOCAL_DIR", "/app/storage"))
        self.base_dir.mkdir(parents=True, exist_ok=True)

    async def save(self, path: str, content: bytes) -> str:
        target = (self.base_dir / path).resolve()
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)
        return str(target)

    async def get(self, path: str) -> Optional[bytes]:
        target = (self.base_dir / path).resolve()
        if not target.is_file():
            return None
        return target.read_bytes()

    async def exists(self, path: str) -> bool:
        target = (self.base_dir / path).resolve()
        return target.is_file()

    async def delete(self, path: str) -> bool:
        target = (self.base_dir / path).resolve()
        if target.is_file():
            target.unlink()
            return True
        return False

    def get_url(self, path: str) -> str:
        return f"/storage/{path.lstrip('/')}"

    def is_healthy(self) -> bool:
        try:
            return self.base_dir.exists() and os.access(str(self.base_dir), os.W_OK | os.R_OK)
        except Exception:
            return False


class S3Storage(StorageBackend):
    """
    TODO: S3 / MinIO compatible object storage adapter.

    Deferred to Milestone 4 (Offline Packs & Cloud Distribution) or production staging.
    When ready, implement using aiobotocore or boto3 connecting to S3_ENDPOINT,
    S3_ACCESS_KEY, S3_SECRET_KEY, and S3_BUCKET_NAME.
    """

    def __init__(self):
        raise NotImplementedError("S3Storage is not yet configured. Use LocalDiskStorage for Milestone 0/dev.")

    async def save(self, path: str, content: bytes) -> str:
        raise NotImplementedError("S3Storage adapter pending Milestone 4.")

    async def get(self, path: str) -> Optional[bytes]:
        raise NotImplementedError("S3Storage adapter pending Milestone 4.")

    async def exists(self, path: str) -> bool:
        raise NotImplementedError("S3Storage adapter pending Milestone 4.")

    async def delete(self, path: str) -> bool:
        raise NotImplementedError("S3Storage adapter pending Milestone 4.")

    def get_url(self, path: str) -> str:
        raise NotImplementedError("S3Storage adapter pending Milestone 4.")

    def is_healthy(self) -> bool:
        return False


def get_storage_backend() -> StorageBackend:
    """Factory function returning configured StorageBackend."""
    backend_type = getattr(settings, "STORAGE_BACKEND", "local").lower()
    if backend_type == "s3":
        return S3Storage()
    return LocalDiskStorage()


storage_backend = get_storage_backend()
