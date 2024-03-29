from sqlalchemy import create_engine, MetaData

engine = create_engine('sqlite:///acf.db')
meta = MetaData()
conn = engine.connect()