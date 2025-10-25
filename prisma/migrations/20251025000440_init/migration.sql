-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `capital` VARCHAR(100) NULL,
    `region` VARCHAR(100) NULL,
    `population` BIGINT NOT NULL,
    `currency_code` VARCHAR(10) NULL,
    `exchange_rate` DOUBLE NULL,
    `estimated_gdp` DOUBLE NULL,
    `flag_url` VARCHAR(255) NULL,
    `last_refreshed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Country_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_meta` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `total_countries` INTEGER NOT NULL DEFAULT 0,
    `last_refreshed_at` DATETIME(3) NULL,
    `summary_image` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
