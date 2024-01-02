-- CreateTable
CREATE TABLE `resultado` (
    `id` VARCHAR(191) NOT NULL,
    `bimestre` ENUM('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO') NOT NULL,
    `disciplina` ENUM('BIOLOGIA', 'ARTES', 'GEOGRAFIA', 'SOCIOLOGIA') NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `nota` DOUBLE NOT NULL,

    UNIQUE INDEX `resultado_bimestre_disciplina_key`(`bimestre`, `disciplina`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
