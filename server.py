from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"files/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    # Extract metadata (this is a placeholder, implement actual metadata extraction)
    # Extract metadata
    metadata = {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": os.path.getsize(file_location),
        "extension": os.path.splitext(file.filename)[1]
    }

    return metadata