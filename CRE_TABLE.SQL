CREATE TABLE `booklog` (
	`isbn13` VARCHAR(13) NOT NULL COLLATE 'utf16_unicode_520_ci',
	`isbn10` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`bookname` VARCHAR(50) NOT NULL COLLATE 'utf16_unicode_520_ci',
	`author` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`publisher` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`genre` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`issuedate` DATE NULL DEFAULT NULL,
	`getdate` DATE NOT NULL,
	`readdate` DATE NULL DEFAULT NULL,
	`ownership` TINYINT(1) NULL DEFAULT NULL,
	`purchase` INT(11) NULL DEFAULT '0',
	`library` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`overview` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`impressions` TEXT NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	`state` INT(10) NULL DEFAULT '0',
	`coverimg` VARCHAR(41) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
	PRIMARY KEY (`isbn13`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
