CREATE DATABASE InventoryDB;
GO

USE InventoryDB;
GO

CREATE SCHEMA Inv;
GO

CREATE TABLE [Inv].[Trn_Users] (
    UsrId int IDENTITY(1,1),
	RlId int NOT NULL,
    UsrNm varchar(50) NOT NULL,
	Pswrd varchar(20) NOT NULL,
	FrstNm varchar(20) NOT NULL,
	LstNm varchar(20) NOT NULL,
	Email varchar(50) NULL,
	PhnNum varchar(20) NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Trn_Users]
ADD CONSTRAint PK_Trn_Users PRIMARY KEY (UsrId);

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_Email DEFAULT '' FOR Email

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_PhnNum DEFAULT '' FOR PhnNum

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Users] ADD CONSTRAint Trn_Users_Def_Purge DEFAULT 0 FOR Purge


CREATE TABLE [Inv].[Bas_Roles] (
    RlId int IDENTITY(1,1),
    RlCd varchar(10) NOT NULL,
	RlNm varchar(20) NOT NULL,
	Rmrks varchar(150) NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Bas_Roles]
ADD CONSTRAint PK_Bas_Roles PRIMARY KEY (RlId);

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Roles] ADD CONSTRAint Bas_Roles_Def_Purge DEFAULT 0 FOR Purge 

CREATE TABLE [Inv].[Bas_Category] (
    CtgryId int IDENTITY(1,1),
    CtgryCd varchar(10) NOT NULL,
	[Label] varchar(20) NOT NULL,
	Rmrks varchar(150) NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Bas_Category]
ADD CONSTRAint PK_Bas_Category PRIMARY KEY (CtgryId);

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Category] ADD CONSTRAint Bas_Category_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Bas_Brand] (
    BrndId int IDENTITY(1,1),
    BrndCd varchar(10) NOT NULL,
	[Label] varchar(20) NOT NULL,
	Rmrks varchar(150) NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Bas_Brand]
ADD CONSTRAint PK_Bas_Brand PRIMARY KEY (BrndId);

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_Brand] ADD CONSTRAint Bas_Brand_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Bas_PaymentTypes] (
    PymntTypId int IDENTITY(1,1),
    PymntCd varchar(10) NOT NULL,
	[Label] varchar(20) NOT NULL,
	Rmrks varchar(150) NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Bas_PaymentTypes]
ADD CONSTRAint PK_Bas_PaymentTypes PRIMARY KEY (PymntTypId);

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_Rmrks DEFAULT '' FOR Rmrks

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Bas_PaymentTypes] ADD CONSTRAint Bas_PaymentTypes_Def_Purge DEFAULT 0 FOR Purge

CREATE TABLE [Inv].[Trn_Products] (
    PrdctId int IDENTITY(1,1),
    PrdctCd varchar(10) NOT NULL,
	PrdctNm varchar(20) NOT NULL,
	PrdctDscrptn varchar(150) NULL,
	UntPrc float NOT NULL,
	CtgryId int NOT NULL,
	BrndId int NOT NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAint PK_Trn_Products PRIMARY KEY (PrdctId);
GO

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAint FK_Trn_Products_CtgryId
FOREIGN KEY (CtgryId) REFERENCES [Inv].[Bas_Category](CtgryId);
GO

ALTER TABLE [Inv].[Trn_Products]
ADD CONSTRAint FK_Trn_Products_BrndId
FOREIGN KEY (BrndId) REFERENCES [Inv].[Bas_Brand](BrndId);
GO

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_PrdctDscrptnc DEFAULT '' FOR PrdctDscrptn

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_UntPrc DEFAULT 0 FOR UntPrc

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Products] ADD CONSTRAint Trn_Products_Def_Purge DEFAULT 0 FOR Purge 

CREATE TABLE [Inv].[Trn_Inventory] (
    InvId int IDENTITY(1,1),
    PrdctId int NOT NULL,
	[Supplier] varchar(20) NOT NULL,
	Qntty int NOT NULL,
	Unit float NOT NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Inventory]
ADD CONSTRAint PK_Trn_Inventory PRIMARY KEY (InvId);
GO

ALTER TABLE [Inv].[Trn_Inventory]
ADD CONSTRAint FK_Trn_Inventory_PrdctId
FOREIGN KEY (PrdctId) REFERENCES [Inv].[Trn_Products] (PrdctId);
GO

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAint Trn_Inventory_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAint Trn_Inventory_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAint Trn_Inventory_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAint Trn_Inventory_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Inventory] ADD CONSTRAint Trn_Inventory_Def_Purge DEFAULT 0 FOR Purge 

GO

CREATE TABLE [Inv].[Trn_Sales] (
    SlsId int IDENTITY(1,1),
	PymntTypId int NOT NULL,
	RcvdAmnt float NOT NULL,
	ChngDue float NOT NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Sales]
ADD CONSTRAint PK_Trn_Sales PRIMARY KEY (SlsId);
GO

ALTER TABLE [Inv].[Trn_Sales] 
ADD CONSTRAint FK_Trn_Sales_PymntTypId
FOREIGN KEY (PymntTypId) REFERENCES [Inv].[Bas_PaymentTypes] (PymntTypId);
GO

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAint Trn_Sales_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAint Trn_Sales_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAint Trn_Sales_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAint Trn_Sales_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Sales] ADD CONSTRAint Trn_Sales_Def_Purge DEFAULT 0 FOR Purge 
GO

CREATE TABLE [Inv].[Trn_Transactions] (
    TrnId int IDENTITY(1,1),
    SlsId int NOT NULL,
	PrdctId int NOT NULL,
	Qntty int NOT NULL,
	CrtDt datetime NOT NULL,
	CrtBy varchar(50) NOT NULL,
	UpdtDt datetime NOT NULL,
	UpdtBy varchar(50) NOT NULL,
	Purge bit NOT NULL
);
GO

ALTER TABLE [Inv].[Trn_Transactions]
ADD CONSTRAint PK_Trn_Transactions PRIMARY KEY (TrnId);
GO

ALTER TABLE [Inv].[Trn_Transactions]
ADD CONSTRAint FK_Trn_Transactions_SlsId
FOREIGN KEY (SlsId) REFERENCES [Inv].[Trn_Sales](SlsId);
GO

ALTER TABLE [Inv].[Trn_Transactions] 
ADD CONSTRAint FK_Trn_Transactions_PrdctId
FOREIGN KEY (PrdctId) REFERENCES [Inv].[Trn_Products](PrdctId);
GO

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAint Trn_Transactions_Def_CrtDt DEFAULT GETDATE() FOR CrtDt

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAint Trn_Transactions_Def_CrtBy DEFAULT 'System' FOR CrtBy

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAint Trn_Transactions_Def_UpdtDt DEFAULT GETDATE() FOR UpdtDt

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAint Trn_Transactions_Def_UpdtBy DEFAULT 'System' FOR UpdtBy

ALTER TABLE [Inv].[Trn_Transactions] ADD CONSTRAint Trn_Transactions_Def_Purge DEFAULT 0 FOR Purge 
GO
