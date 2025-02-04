CREATE DATABASE InventoryDB;
GO

USE InventoryDB;
GO

CREATE SCHEMA Inv;
GO

CREATE TABLE [Inv].[Trn_Users] (
    UsrId INT IDENTITY(1,1),
	RlId INT NOT NULL,
    UsrNm VARCHAR(50) NOT NULL,
	Pswrd VARCHAR(20) NOT NULL,
	FrstNm VARCHAR(20) NOT NULL,
	LstNm VARCHAR(20) NOT NULL,
	Email VARCHAR(50) NULL,
	PhnNum VARCHAR(20) NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Trn_Users]
ADD CONSTRAINT PK_Trn_Users PRIMARY KEY (UsrId);

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_Email DEFAULT '' FOR Email

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_PhnNum DEFAULT '' FOR PhnNum

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAINT Trn_Users_Def_Purge DEFAULT 0 FOR Purge


CREATE TABLE [Inv].[Bas_Roles] (
    RlId INT IDENTITY(1,1),
    RlCd VARCHAR(10) NOT NULL,
	RlNm VARCHAR(20) NOT NULL,
	Rmrks VARCHAR(150) NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Bas_Roles]
ADD CONSTRAINT PK_Bas_Roles PRIMARY KEY (RlId);

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAINT Bas_Roles_Def_Purge DEFAULT 0 FOR Purge 

CREATE TABLE [Inv].[Bas_Category] (
    CtgryId INT IDENTITY(1,1),
    CtgryCd VARCHAR(10) NOT NULL,
	[Label] VARCHAR(20) NOT NULL,
	Rmrks VARCHAR(150) NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Bas_Category]
ADD CONSTRAINT PK_Bas_Category PRIMARY KEY (CtgryId);

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAINT Bas_Category_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Bas_Brand] (
    BrndId INT IDENTITY(1,1),
    BrndCd VARCHAR(10) NOT NULL,
	[Label] VARCHAR(20) NOT NULL,
	Rmrks VARCHAR(150) NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Bas_Brand]
ADD CONSTRAINT PK_Bas_Brand PRIMARY KEY (BrndId);

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAINT Bas_Brand_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Bas_PaymentTypes] (
    PymntTypId INT IDENTITY(1,1),
    PymntCd VARCHAR(10) NOT NULL,
	[Label] VARCHAR(20) NOT NULL,
	Rmrks VARCHAR(150) NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Bas_PaymentTypes]
ADD CONSTRAINT PK_Bas_PaymentTypes PRIMARY KEY (PymntTypId);

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAINT Bas_PaymentTypes_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Trn_Products] (
    PrdctId INT IDENTITY(1,1),
    PrdctCd VARCHAR(10) NOT NULL,
	PrdctNm VARCHAR(20) NOT NULL,
	PrdctDscrptn VARCHAR(150) NULL,
	UntPrc INT NOT NULL,
	CtgryId INT NOT NULL,
	BrndId INT NOT NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAINT PK_Trn_Products PRIMARY KEY (PrdctId);
GO

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAINT FK_Trn_Products_CtgryId
FOREIGN KEY (CtgryId) REFERENCES [Inv].[Bas_Category](CtgryId);
GO

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAINT FK_Trn_Products_BrndId
FOREIGN KEY (BrndId) REFERENCES [Inv].[Bas_Brand](BrndId);
GO

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_PrdctDscrptnc DEFAULT '' FOR PrdctDscrptn

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_UntPrc DEFAULT 0 FOR UntPrc

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAINT Trn_Products_Def_Purge DEFAULT 0 FOR Purge 

CREATE TABLE [Inv].[Trn_Inventory] (
    InvId INT IDENTITY(1,1),
    PrdctId INT NOT NULL,
	[Supplier] VARCHAR(20) NOT NULL,
	Qntty INT NOT NULL,
	Unit INT NOT NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Inventory]
ADD CONSTRAINT PK_Trn_Inventory PRIMARY KEY (InvId);
GO

ALTER TABLE [Inv].[Trn_Inventory]
ADD CONSTRAINT FK_Trn_Inventory_PrdctId
FOREIGN KEY (PrdctId) REFERENCES [Inv].[Trn_Products] (PrdctId);
GO

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAINT Trn_Inventory_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAINT Trn_Inventory_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAINT Trn_Inventory_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAINT Trn_Inventory_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAINT Trn_Inventory_Def_Purge DEFAULT 0 FOR Purge 

GO

CREATE TABLE [Inv].[Trn_Sales] (
    SlsId INT IDENTITY(1,1),
	PymntTypId INT NOT NULL,
	RcvdAmnt FLOAT NOT NULL,
	ChngDue FLOAT NOT NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Sales]
ADD CONSTRAINT PK_Trn_Sales PRIMARY KEY (SlsId);
GO

ALTER TABLE [Inv].[Trn_Sales] 
ADD CONSTRAINT FK_Trn_Sales_PymntTypId
FOREIGN KEY (PymntTypId) REFERENCES [Inv].[Bas_PaymentTypes] (PymntTypId);
GO

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAINT Trn_Sales_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAINT Trn_Sales_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAINT Trn_Sales_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAINT Trn_Sales_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAINT Trn_Sales_Def_Purge DEFAULT 0 FOR Purge 
GO

CREATE TABLE [Inv].[Trn_Transactions] (
    TrnId INT IDENTITY(1,1),
    SlsId INT NOT NULL,
	PrdctId INT NOT NULL,
	Qntty INT NOT NULL,
	CrtDt DATETIME NOT NULL,
	CrtBy VARCHAR(50) NOT NULL,
	UpdtDt DATETIME NOT NULL,
	UpdtBy VARCHAR(50) NOT NULL,
	Purge BIT NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Transactions]
ADD CONSTRAINT PK_Trn_Transactions PRIMARY KEY (TrnId);
GO

ALTER TABLE [Inv].[Trn_Transactions]
ADD CONSTRAINT FK_Trn_Transactions_SlsId
FOREIGN KEY (SlsId) REFERENCES [Inv].[Trn_Sales](SlsId);
GO

ALTER TABLE [Inv].[Trn_Transactions] 
ADD CONSTRAINT FK_Trn_Transactions_PrdctId
FOREIGN KEY (PrdctId) REFERENCES [Inv].[Trn_Products](PrdctId);
GO

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAINT Trn_Transactions_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAINT Trn_Transactions_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAINT Trn_Transactions_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAINT Trn_Transactions_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAINT Trn_Transactions_Def_Purge DEFAULT 0 FOR Purge 
GO
