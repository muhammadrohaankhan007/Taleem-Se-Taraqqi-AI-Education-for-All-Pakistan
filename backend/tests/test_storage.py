import asyncio
import pytest
from app.storage.base import LocalDiskStorage, S3Storage, StorageBackend


def test_local_disk_storage_crud(tmp_path):
    storage = LocalDiskStorage(base_dir=str(tmp_path))
    assert isinstance(storage, StorageBackend)
    assert storage.is_healthy() is True

    async def _run_crud():
        # Save
        saved_path = await storage.save("lessons/test.json", b'{"key": "value"}')
        assert await storage.exists("lessons/test.json") is True

        # Get
        content = await storage.get("lessons/test.json")
        assert content == b'{"key": "value"}'

        # URL
        url = storage.get_url("lessons/test.json")
        assert url == "/storage/lessons/test.json"

        # Delete
        deleted = await storage.delete("lessons/test.json")
        assert deleted is True
        assert await storage.exists("lessons/test.json") is False
        assert await storage.get("lessons/test.json") is None

    asyncio.run(_run_crud())


def test_s3_storage_stub():
    with pytest.raises(NotImplementedError):
        S3Storage()
