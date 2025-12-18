-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: breakbook
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `move`
--

DROP TABLE IF EXISTS `move`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `move` (
  `idmove` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `video` longtext,
  `tutorial` varchar(255) DEFAULT NULL,
  `history` text,
  `origin` varchar(255) DEFAULT NULL,
  `fk_user` bigint DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idmove`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `user_move_idx` (`fk_user`),
  CONSTRAINT `user_move` FOREIGN KEY (`fk_user`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `move`
--

LOCK TABLES `move` WRITE;
/*!40000 ALTER TABLE `move` DISABLE KEYS */;
INSERT INTO `move` VALUES (39,'Three step',NULL,'<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/frZ6OORWC_o?si=pLBL3crtCdRe6bH3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',NULL,'El Three Step Breaking nació en los años 70 en Nueva York como un paso básico y esencial dentro del breaking, desarrollado por los primeros b-boys para mantener ritmo y movilidad en la pista, y tiene raíces en las influencias culturales afroamericanas y latinas propias de la época.','E.E.U.U.',49,'footwork'),(56,'Flare',NULL,'<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TL1LzSwwiKo?si=wgSZW2dxSvCV_RoC\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',NULL,'B-boys legendarios como Ken Swift (Rock Steady Crew) y otros innovadores del breaking ayudaron a popularizar y perfeccionar este movimiento. Aunque no está claro quién fue el primero en hacer un Flare, se reconoce que la influencia de la gimnasia y la búsqueda de movimientos espectaculares llevó a su creación.','E.E.U.U.',38,'power'),(60,'Airflare',NULL,'<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TL1LzSwwiKo?si=wgSZW2dxSvCV_RoC\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',NULL,'El movimiento fue inventado y popularizado en la década de los 90 por b-boys de la costa oeste de Estados Unidos. Se atribuye especialmente a Madonna, un b-boy conocido por sus movimientos innovadores y habilidades aéreas. Otros b-boys y crews de la escena de California ayudaron a difundir y perfeccionar el Airflare.','E.E.U.U.',38,'power'),(65,'Two Step',NULL,'<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SM9mRKqALPI?si=E1SpKIVVwMh1krPW\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',NULL,'El Two Step es un paso básico de footwork en breaking, originado en los 70 en Nueva York como parte de los primeros movimientos del breaking. Su simplicidad y ritmo lo hacen esencial para mantener la fluidez y preparar movimientos más avanzados en las batallas.','E.E.U.U.',38,'footwork'),(66,'Zulu Spin',NULL,'',NULL,'','',38,'footwork'),(67,'Airbaby',NULL,NULL,NULL,NULL,NULL,38,'freeze'),(68,'Chair',NULL,NULL,NULL,NULL,NULL,38,'freeze'),(69,'Windmills',NULL,NULL,NULL,NULL,NULL,38,'power'),(70,'Baby Mills',NULL,NULL,NULL,NULL,NULL,38,'power'),(72,'Baby Love',NULL,NULL,NULL,NULL,NULL,38,'footwork');
/*!40000 ALTER TABLE `move` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `round`
--

DROP TABLE IF EXISTS `round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `round` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `fk_user` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8med965fh4hbkt9y5xrapoblc` (`fk_user`),
  CONSTRAINT `FK8med965fh4hbkt9y5xrapoblc` FOREIGN KEY (`fk_user`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round`
--

LOCK TABLES `round` WRITE;
/*!40000 ALTER TABLE `round` DISABLE KEYS */;
INSERT INTO `round` VALUES (7,'Flare',38),(11,'Final',38),(12,'Filtros',38),(15,'hola',38),(16,'fgh fghgfvcjh',38),(17,'Rondaza',42),(21,'Octavos de final',40),(35,'Final',40),(43,'Mi ronda',38),(44,'Mi ronda',49),(45,'Filtros',49),(46,'Octavos de final',49),(47,'Cuartos de final',49);
/*!40000 ALTER TABLE `round` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `round_moves`
--

DROP TABLE IF EXISTS `round_moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `round_moves` (
  `round_id` bigint NOT NULL,
  `move_id` bigint NOT NULL,
  KEY `FKb5p50cl44n1548cas8t59qic9` (`move_id`),
  KEY `FKcdbsn4q1h1orpchwtxfdh5s2q` (`round_id`),
  CONSTRAINT `FKb5p50cl44n1548cas8t59qic9` FOREIGN KEY (`move_id`) REFERENCES `move` (`idmove`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKcdbsn4q1h1orpchwtxfdh5s2q` FOREIGN KEY (`round_id`) REFERENCES `round` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round_moves`
--

LOCK TABLES `round_moves` WRITE;
/*!40000 ALTER TABLE `round_moves` DISABLE KEYS */;
INSERT INTO `round_moves` VALUES (12,39),(15,39),(16,39),(17,39),(21,39),(35,39),(35,56),(7,56),(7,60),(43,39),(43,56),(43,60),(43,66),(43,67),(43,68),(44,65),(44,66),(44,67),(44,68),(44,69),(44,70),(45,39),(45,56),(45,65),(45,68),(45,60),(47,66),(47,67),(47,69),(46,56),(46,39);
/*!40000 ALTER TABLE `round_moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (38,'puga','puga@gmail.com','$2a$10$ai3z2fGrT0LBs/5yPIGGiuWopofNgw.eOdz55bHCSwUPzqtzhPyB6','USER'),(40,'Guillermo','guillermo@gmail.com','$2a$10$aazW3ZzquSnPHIULcyPdYusIwBS0PzgcejEibhF0AUmuF9IWOswtq','USER'),(42,'hola','hola@gmail.com','$2a$10$Tq5zMbrGZvH4SdXekyNMwOvXSfcxRHlTOMzoW5Ebtpc/UkGO7fQLG','USER'),(49,'Adrián Puga Santos','breakbookapp@gmail.com','$2y$10$k.hlDBq.BP9OeWXxJjI54eZqGv/BXXRwKwNPrgw4HALe4YIExCPMi','ADMIN'),(50,'patricia','patritamayod@gmail.com','$2a$10$hbGSJb4qwubmX1V8amg7g.B8UpTjJ1736g.d72p3T/..ZC6Dww19W','USER'),(51,'miaplicacionweb','miaplicacionweb@gmail.com','$2a$10$22HktkDtabINIEPaO6BdxOhMok8SukLKzg56GqltioJdkhqk2exTW','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 17:30:52
