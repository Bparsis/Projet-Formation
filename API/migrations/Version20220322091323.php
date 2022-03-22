<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220322091323 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commentaire (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, type VARCHAR(255) NOT NULL, parent INT NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_67F068BC61220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE favori (id INT AUTO_INCREMENT NOT NULL, coords LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', titre VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fil_message (id INT AUTO_INCREMENT NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, fil_message_id INT NOT NULL, creator_id INT NOT NULL, content VARCHAR(255) NOT NULL, date DATETIME NOT NULL, INDEX IDX_B6BD307F5A2C1EDA (fil_message_id), INDEX IDX_B6BD307F61220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE poi (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, coords LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', titre VARCHAR(255) NOT NULL, category VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, note DOUBLE PRECISION DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, INDEX IDX_7DBB1FD6A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, user_name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, address LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', phone_number VARCHAR(255) DEFAULT NULL, mail VARCHAR(255) DEFAULT NULL, transport VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_favori (user_id INT NOT NULL, favori_id INT NOT NULL, INDEX IDX_8AD7B9F1A76ED395 (user_id), INDEX IDX_8AD7B9F1FF17033F (favori_id), PRIMARY KEY(user_id, favori_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_fil_message (user_id INT NOT NULL, fil_message_id INT NOT NULL, INDEX IDX_4A8F7763A76ED395 (user_id), INDEX IDX_4A8F77635A2C1EDA (fil_message_id), PRIMARY KEY(user_id, fil_message_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_user (user_source INT NOT NULL, user_target INT NOT NULL, INDEX IDX_F7129A803AD8644E (user_source), INDEX IDX_F7129A80233D34C1 (user_target), PRIMARY KEY(user_source, user_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commentaire ADD CONSTRAINT FK_67F068BC61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F5A2C1EDA FOREIGN KEY (fil_message_id) REFERENCES fil_message (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE poi ADD CONSTRAINT FK_7DBB1FD6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_favori ADD CONSTRAINT FK_8AD7B9F1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_favori ADD CONSTRAINT FK_8AD7B9F1FF17033F FOREIGN KEY (favori_id) REFERENCES favori (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_fil_message ADD CONSTRAINT FK_4A8F7763A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_fil_message ADD CONSTRAINT FK_4A8F77635A2C1EDA FOREIGN KEY (fil_message_id) REFERENCES fil_message (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A803AD8644E FOREIGN KEY (user_source) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A80233D34C1 FOREIGN KEY (user_target) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_favori DROP FOREIGN KEY FK_8AD7B9F1FF17033F');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F5A2C1EDA');
        $this->addSql('ALTER TABLE user_fil_message DROP FOREIGN KEY FK_4A8F77635A2C1EDA');
        $this->addSql('ALTER TABLE commentaire DROP FOREIGN KEY FK_67F068BC61220EA6');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F61220EA6');
        $this->addSql('ALTER TABLE poi DROP FOREIGN KEY FK_7DBB1FD6A76ED395');
        $this->addSql('ALTER TABLE user_favori DROP FOREIGN KEY FK_8AD7B9F1A76ED395');
        $this->addSql('ALTER TABLE user_fil_message DROP FOREIGN KEY FK_4A8F7763A76ED395');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A803AD8644E');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A80233D34C1');
        $this->addSql('DROP TABLE commentaire');
        $this->addSql('DROP TABLE favori');
        $this->addSql('DROP TABLE fil_message');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE poi');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_favori');
        $this->addSql('DROP TABLE user_fil_message');
        $this->addSql('DROP TABLE user_user');
    }
}
