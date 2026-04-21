-- ============================================
-- Step 1: Create the database
-- Run this in SQL Server Management Studio (SSMS)
-- ============================================

-- Create the database (skip if you already have one)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ArhantWebsite')
BEGIN
    CREATE DATABASE ArhantWebsite;
END
GO

USE ArhantWebsite;
GO

-- ============================================
-- Step 2: Create the blogs table
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'blogs')
BEGIN
    CREATE TABLE blogs (
        id              INT IDENTITY(1,1) PRIMARY KEY,
        title           NVARCHAR(300)   NOT NULL,
        slug            NVARCHAR(300)   NOT NULL UNIQUE,
        excerpt         NVARCHAR(500)   NULL,
        content         NVARCHAR(MAX)   NULL,
        category        NVARCHAR(100)   NOT NULL,
        image_url       NVARCHAR(500)   NULL,
        image_alt       NVARCHAR(300)   NULL,
        meta_title      NVARCHAR(300)   NULL,
        meta_description NVARCHAR(500)  NULL,
        is_published    BIT             NOT NULL DEFAULT 0,
        created_at      DATETIME2       NOT NULL DEFAULT GETDATE(),
        updated_at      DATETIME2       NOT NULL DEFAULT GETDATE()
    );
END

-- Add missing columns if the table already exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'blogs')
BEGIN
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('blogs') AND name = 'image_alt')
        ALTER TABLE blogs ADD image_alt NVARCHAR(300) NULL;
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('blogs') AND name = 'meta_title')
        ALTER TABLE blogs ADD meta_title NVARCHAR(300) NULL;
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('blogs') AND name = 'meta_description')
        ALTER TABLE blogs ADD meta_description NVARCHAR(500) NULL;
END
GO

-- ============================================
-- Step 3: Create the admin_users table (for login)
-- ============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'admin_users')
BEGIN
    CREATE TABLE admin_users (
        id          INT IDENTITY(1,1) PRIMARY KEY,
        email       NVARCHAR(255)   NOT NULL UNIQUE,
        password    NVARCHAR(255)   NOT NULL,
        name        NVARCHAR(100)   NOT NULL,
        created_at  DATETIME2       NOT NULL DEFAULT GETDATE()
    );
END
GO

-- ============================================
-- Step 4: Insert some sample blog data
-- ============================================
INSERT INTO blogs (title, slug, excerpt, category, is_published)
VALUES
    ('The Future of Micro Insurance in Developing Nations',
     'future-micro-insurance-developing-nations',
     'Exploring how micro insurance models are reshaping financial protection for underserved communities.',
     'Industry Trends', 1),

    ('How Automation is Reducing Claims Processing Time by 40%',
     'automation-reducing-claims-processing',
     'AI-driven workflows are cutting manual overhead and dramatically accelerating claims resolution.',
     'Technology', 1),

    ('IEnsure General: A Comprehensive Look at Capabilities',
     'iensure-general-comprehensive-look',
     'An in-depth overview of the latest features and enhancements shipped in IEnsure General.',
     'Product Update', 1);
GO

PRINT 'Database setup complete!';
GO
