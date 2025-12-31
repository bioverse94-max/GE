# Backend

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip

### Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
```

2. Activate the virtual environment:
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Environment Setup

Create a `.env` file in the `backend/` directory with the following variables:

```
MONGO_URL=your_mongodb_connection_string
DB_NAME=your_database_name
CORS_ORIGINS=http://localhost:3000
```

### Starting the Server

To start the backend development server:

```bash
uvicorn server:app --reload
```

The API will be available at `http://localhost:8000`

- API documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Running on a Different Port

To run on a different port (e.g., 8001):

```bash
uvicorn server:app --reload --port 8001
```

