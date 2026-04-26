from models import Base
from main import engine

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("数据库表创建完成")