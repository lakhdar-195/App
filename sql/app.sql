SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `DesktopApp`.`Clients` 
DROP FOREIGN KEY `fk_Clients_Login1`;

ALTER TABLE `DesktopApp`.`Project` 
DROP FOREIGN KEY `fk_Project_Clients`;

ALTER TABLE `DesktopApp`.`Payment` 
DROP FOREIGN KEY `fk_Payment_Project1`;

ALTER TABLE `DesktopApp`.`Spent` 
DROP FOREIGN KEY `fk_Spent_Project1`;

ALTER TABLE `DesktopApp`.`Clients` 
ADD CONSTRAINT `fk_Clients_Login1`
  FOREIGN KEY (`Login_id`)
  REFERENCES `DesktopApp`.`Login` (`id_login`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `DesktopApp`.`Project` 
ADD CONSTRAINT `fk_Project_Clients`
  FOREIGN KEY (`Clients_id`)
  REFERENCES `DesktopApp`.`Clients` (`id_client`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `DesktopApp`.`Payment` 
ADD CONSTRAINT `fk_Payment_Project1`
  FOREIGN KEY (`Project_id`)
  REFERENCES `DesktopApp`.`Project` (`id_project`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `DesktopApp`.`Spent` 
ADD CONSTRAINT `fk_Spent_Project1`
  FOREIGN KEY (`Project_id`)
  REFERENCES `DesktopApp`.`Project` (`id_project`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
