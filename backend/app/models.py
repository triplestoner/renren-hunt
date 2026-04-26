from sqlalchemy import Column, String, Integer, Float, Boolean, Date, JSON, UUID
from sqlalchemy import UUID as SA_UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(SA_UUID(), primary_key=True, default=uuid.uuid4)
    role = Column(String(20), nullable=False)
    openid = Column(String(100), unique=True)
    phone = Column(String(20))
    created_at = Column(Date)

class Bounty(Base):
    __tablename__ = 'bounties'
    
    id = Column(SA_UUID(), primary_key=True, default=uuid.uuid4)
    company = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)
    reward = Column(Float, nullable=False)
    guarantee_days = Column(Integer, default=90)
    status = Column(String(20), default='open')

class Candidate(Base):
    __tablename__ = 'candidates'
    
    id = Column(SA_UUID(), primary_key=True, default=uuid.uuid4)
    name_hash = Column(String(64), nullable=False)
    is_masked = Column(Boolean, default=True)
    real_contact = Column(JSON)
    resume_url = Column(String(255))
    skills_json = Column(JSON)

class Pipeline(Base):
    __tablename__ = 'pipelines'
    
    id = Column(SA_UUID(), primary_key=True, default=uuid.uuid4)
    bounty_id = Column(SA_UUID())
    candidate_id = Column(SA_UUID())
    stage = Column(String(20), default='screened')
    escrow_amount = Column(Float, default=0)
    guarantee_days = Column(Integer, default=0)
    guarantee_start_date = Column(Date)
    refund_amount = Column(Float, default=0)

class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(SA_UUID(), primary_key=True, default=uuid.uuid4)
    pipeline_id = Column(SA_UUID())
    payer_id = Column(SA_UUID())
    payee_id = Column(SA_UUID())
    amount = Column(Float, nullable=False)
    type = Column(String(20))
    status = Column(String(20), default='pending')
    out_trade_no = Column(String(100))
    created_at = Column(Date)