<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220317092532 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commentaire (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, commentaire LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE poi (id INT AUTO_INCREMENT NOT NULL, commentaire_id INT DEFAULT NULL, user_id INT DEFAULT NULL, coords LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', titre VARCHAR(255) NOT NULL, categry VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, note DOUBLE PRECISION DEFAULT NULL, image VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_7DBB1FD6BA9CD190 (commentaire_id), INDEX IDX_7DBB1FD6A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, user_name VARCHAR(255) NOT NULL, pass_word VARCHAR(255) NOT NULL, address LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', phone_number VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE poi ADD CONSTRAINT FK_7DBB1FD6BA9CD190 FOREIGN KEY (commentaire_id) REFERENCES commentaire (id)');
        $this->addSql('ALTER TABLE poi ADD CONSTRAINT FK_7DBB1FD6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE poi DROP FOREIGN KEY FK_7DBB1FD6BA9CD190');
        $this->addSql('ALTER TABLE poi DROP FOREIGN KEY FK_7DBB1FD6A76ED395');
        $this->addSql('DROP TABLE commentaire');
        $this->addSql('DROP TABLE poi');
        $this->addSql('DROP TABLE user');
    }
}
