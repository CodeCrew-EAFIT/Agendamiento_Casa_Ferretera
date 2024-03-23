from fastapi import FastAPI, HTTPException
import libsql_experimental as libsql
import uvicorn

# Create FastAPI app
app = FastAPI()

# Function to fetch promotions for a given promoter_user_id
def get_promotions(promoter_user_id):
    conn = libsql.connect("acf.db")
    query = "SELECT * FROM Promotion WHERE promoter_user_id = ?"
    promotions = conn.execute(query, (promoter_user_id,)).fetchall()
    return promotions

# Route to fetch promotions for a given promoter_user_id
@app.get("/promotions/{promoter_user_id}")
async def fetch_promotions(promoter_user_id: int):
    promotions = get_promotions(promoter_user_id)
    print(promotions)
    return promotions


# Command to run the app:
## uvicorn testapi:app --host 127.0.0.1 --port 8080