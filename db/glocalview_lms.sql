-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2026 at 10:19 AM
-- Server version: 10.11.15-MariaDB
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glocalview_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `accademic_year`
--

CREATE TABLE `accademic_year` (
  `id` bigint(20) NOT NULL,
  `accademic_year_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `accademic_year` varchar(15) NOT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `accademic_year`
--

INSERT INTO `accademic_year` (`id`, `accademic_year_uuid`, `accademic_year`, `is_current`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'f715c22c-01da-4d25-b45b-9e5f1191173e', '2023-2024', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'e9b7cdf6-efbc-4f02-9494-a3bbb7e712b6', '2024-2025', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, '211e3a60-6ee0-4ffb-82e5-d29b0c9c38b9', '2025-2026', 1, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, '70ff72b1-2e0e-485d-8151-112e1a0a9b05', '2026-2027', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, '38846374-1371-46b4-aa32-acfbae03e092', '2027-2028', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(6, '57591253-d0ff-4268-b2a1-82d03f19577b', '2028-2029', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(7, '577fa7f3-daef-4930-adc5-55f622fa5099', '2029-2030', 0, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `title`, `description`, `created_by`, `created_at`, `deleted_at`) VALUES
(1, 'New School Registered', 'Ganga International School was registered.', 2, '2025-12-23 10:13:49', NULL),
(2, 'New Teacher Created', 'Ankit Bhatnagar was added.', 2, '2025-12-23 11:00:47', NULL),
(3, 'New Teacher Created', 'Bipin Sharma was added.', 2, '2025-12-23 11:03:35', NULL),
(4, 'New Teacher Created', 'Gaurav Sharma was added.', 2, '2025-12-23 11:05:49', NULL),
(5, 'New Teacher Created', 'Umesh Kumar was added.', 2, '2025-12-23 11:07:28', NULL),
(6, 'New Teacher Created', 'Prince Kushwaha was added.', 2, '2025-12-23 11:09:54', NULL),
(7, 'New Teacher Created', 'Prabudh Agarwal was added.', 2, '2025-12-23 11:12:27', NULL),
(8, 'New Student Created', 'Sanjeev Kapoor was added.', 3, '2025-12-23 11:18:17', NULL),
(9, 'New Student Created', 'Jyoti Bhardwaj was added.', 3, '2025-12-23 11:20:25', NULL),
(10, 'New Student Created', 'Hemanto was added.', 3, '2025-12-23 11:21:52', NULL),
(11, 'New Student Created', 'Ankit Tewatia was added.', 3, '2025-12-23 11:25:03', NULL),
(12, 'New Student Created', 'Tushar  was added.', 3, '2025-12-23 11:27:38', NULL),
(13, 'New Student Created', 'Sanjeev Singh was added.', 4, '2025-12-23 16:12:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `id` bigint(20) NOT NULL,
  `assessment_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `assessment_type_id` bigint(20) NOT NULL,
  `school_subject_id` bigint(20) DEFAULT NULL,
  `course_id` bigint(20) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `class_section_id` bigint(20) DEFAULT NULL,
  `accademic_year_id` int(11) DEFAULT NULL,
  `assessment_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assessment_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date_time` datetime DEFAULT NULL,
  `end_date_time` datetime DEFAULT NULL,
  `duration_in_minutes` int(11) DEFAULT NULL,
  `total_marks` int(11) NOT NULL DEFAULT 0,
  `passing_marks` int(11) NOT NULL DEFAULT 0,
  `created_by` bigint(20) NOT NULL,
  `added_by` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment`
--

INSERT INTO `assessment` (`id`, `assessment_uuid`, `assessment_type_id`, `school_subject_id`, `course_id`, `class_id`, `class_section_id`, `accademic_year_id`, `assessment_title`, `assessment_description`, `start_date_time`, `end_date_time`, `duration_in_minutes`, `total_marks`, `passing_marks`, `created_by`, `added_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(6, '89ecd663-dce5-4837-a449-352d0560dc7d', 1, 1, NULL, 1, NULL, 3, 'Hindi Unit Test', 'Hindi Unit Test', '2025-12-23 12:10:14', '2025-12-27 12:10:00', 30, 10, 4, 3, 3, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(7, 'd3e96483-bbb5-46f3-8b54-5372d83d8eef', 1, 31, NULL, 4, NULL, 3, 'English Unit Test', 'English Unit Test', '2025-12-23 16:01:11', '2026-12-31 16:00:00', 30, 10, 4, 4, 4, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment_class_section_link`
--

CREATE TABLE `assessment_class_section_link` (
  `id` bigint(20) NOT NULL,
  `assessment_id` bigint(20) NOT NULL,
  `class_section_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_class_section_link`
--

INSERT INTO `assessment_class_section_link` (`id`, `assessment_id`, `class_section_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(6, 6, 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(7, 7, 11, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment_question`
--

CREATE TABLE `assessment_question` (
  `id` bigint(20) NOT NULL,
  `assessment_question_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `assessment_id` bigint(20) NOT NULL,
  `assessment_question_type_id` bigint(20) NOT NULL,
  `question_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_marks` int(11) NOT NULL DEFAULT 1,
  `correct_answer_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_question`
--

INSERT INTO `assessment_question` (`id`, `assessment_question_uuid`, `assessment_id`, `assessment_question_type_id`, `question_text`, `max_marks`, `correct_answer_text`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ae079bc4-a826-4fa0-9e24-83cb3bbc417c', 6, 1, 'चिड़िया की विशेषता क्या नहीं है ?', 1, NULL, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(2, 'd9a0d11f-26f3-4b34-abd0-07875785a544', 6, 1, 'चिड़िया क्या मारकर नदी के जल पर चढ़ी ?', 1, NULL, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(3, '6e0acc05-26c8-45e5-ad7b-d5949b2c1fd7', 6, 1, 'चिड़िया का गाना कैसा है ?', 1, NULL, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(4, '063ad159-90ba-474d-bedc-18ffbd817816', 6, 1, 'निम्न पंक्ति को पूरा करो:- वह छोटी मुँह बोली चिड़िया, नीले पंखों वाली मैं हूँ, मुझे विजन से..................है।', 1, NULL, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(5, '8dfb6564-6239-4ffc-90b7-0ffe88141158', 6, 1, 'निम्न पंक्ति को पूरा करो:- चढ़ी नदी का दिल टटोलकर, जल का .......ले जाती है, वह छोटी ...............चिड़िया ।', 1, NULL, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(6, '86858118-7cfd-4849-ace5-c6781ea5fcd4', 6, 1, 'निम्न में से शुद्ध शब्द छाँटो :-', 1, NULL, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(7, '25777bb7-b669-47b3-837d-7629c0b1ca8b', 6, 1, ' चिड़िया चोंच मारकर किसके दूध भरे दाने खाती है ?', 1, NULL, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(8, 'f4fbbefe-15a6-4ef3-afb3-bd54c7e4020b', 6, 1, 'वह चिड़िया किसके खातिर गाती है ?', 1, NULL, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(9, 'c7eb7556-e388-4182-be06-d4e6f8f0c8fd', 6, 1, 'चिड़िया को किस से प्यार नहीं है ?', 1, NULL, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(10, 'a5f2664e-8c50-4eb1-a067-d438883ffed8', 6, 1, 'जल की बूँदे कैसी है ?', 1, NULL, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(11, '554aeebc-bae7-477e-a90a-8db05f8594b7', 7, 1, 'Who is the author of “The Fun They Had”?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(12, '573fbd1a-42f1-4ae4-a3a0-671cdc0619ec', 7, 1, 'What did Tommy find?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(13, '36db6fad-9f59-4006-9ada-fc694b340604', 7, 1, 'What was the date written in Margie’s diary?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(14, 'c73105c5-5a01-4446-b040-b24ae6fc0dcb', 7, 1, 'What was special about the book Tommy found?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(15, '08f47b55-8c18-40b7-9fce-5441b37172f8', 7, 1, 'Who told Margie that stories were once printed on paper?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(16, '9bda4159-4593-4558-9d3d-fc4ba9be51e4', 7, 1, 'How old was Margie?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(17, 'e9c92e8f-af07-4c12-bcff-e89d3e4bcd85', 7, 1, 'How old was Tommy?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(18, 'efc9c282-f419-4c0b-af54-80363ec64b49', 7, 1, 'Where did Tommy find the book?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(19, 'c0764e79-0bd7-43a4-a790-42a4782a050c', 7, 1, 'What was the book about?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(20, '41eb2e74-4e09-40cc-8e2a-d7d9aa7d42cd', 7, 1, 'What did Margie think about school?', 1, NULL, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment_question_option`
--

CREATE TABLE `assessment_question_option` (
  `id` bigint(20) NOT NULL,
  `assessment_question_option_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `assessment_question_id` bigint(20) NOT NULL,
  `option_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_question_option`
--

INSERT INTO `assessment_question_option` (`id`, `assessment_question_option_uuid`, `assessment_question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '86f29e22-be23-4c35-98d3-69e9420f3f4b', 1, 'मुँहबोली', 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(2, 'f32152a6-b850-4ab9-8632-95dbf4bf4e34', 1, 'नीले पंख', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(3, '5c116a93-2009-4659-b47b-6725eaed209a', 1, 'छोटी', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(4, '0c3907cc-6759-49fc-9993-8a9d179b97ed', 1, 'काली-पीली', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(5, '631976f5-eee4-4114-871f-cb89fec30ea6', 2, 'कंठ', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(6, 'cecddbe4-71d8-4874-bf1d-1dd496ab0735', 2, 'चोंच', 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(7, '1d705009-cdf4-4a1a-a1d5-0b45b4bea26b', 2, 'पाँव', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(8, '2076613f-89c9-4ad9-87ce-acdb34837c10', 2, 'एड़ी', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(9, '51f08596-312e-45c8-9158-a58de2222dd2', 3, 'बेरोक', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(10, '8c736e49-9983-4e89-be77-63d85eb8eaaf', 3, 'रूक-रूककर', 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(11, 'bd854ce8-6c92-45c7-8e31-6834546f8203', 3, 'संगीतमय', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(12, 'd3021989-8750-480a-a847-dbc7ea008ca3', 3, 'लयात्मक', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(13, 'c45238b7-8834-428c-8985-ed7045691763', 4, 'कम प्यार', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(14, '82ad9786-d4af-44b2-9edb-5ff8b59e48de', 4, 'अधिक प्यार', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(15, 'b58fdab1-714c-4ac8-a11b-3f20a25db3f4', 4, 'बहुत प्यार', 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(16, 'f31b749f-e28a-4fda-a174-e725bc9d9e38', 4, 'उपरोक्त सभी', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(17, 'f2ecf338-b2c2-4702-b000-c2aecfe7ab38', 5, 'पत्थर, गरबीली', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(18, 'c5575638-79a5-4638-82d9-1e07b68ce605', 5, 'मोती,गरबीली', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(19, 'c0ee7da2-1459-46b9-93b2-b4c7e14d463b', 5, 'मोती, घना', 1, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(20, '378e46d5-1b2f-4388-997b-bf76cfd1d2c8', 5, 'उपरोक्त सभी', 0, '2025-12-23 15:58:19', '2025-12-23 15:58:19', NULL),
(21, '40aff72d-d453-4320-b025-26ec12d047b9', 6, 'दुध', 1, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(22, '9e25394c-3113-437d-becc-7d24b539a5a3', 6, 'दूध', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(23, '60ae4244-6616-466b-a864-045bcaec056f', 6, 'दुघ', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(24, '8a29752d-402c-4d0a-8815-b28c9299309c', 6, 'इनमें से कोई नहीं', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(25, '304f4daf-2d44-4087-99f7-d143a50eac9c', 7, 'जुंडी के', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(26, '6c172e79-9a66-480a-94a9-d8098c89df3d', 7, 'बाजरे के', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(27, '975e9093-bac8-49f4-9b61-827df81581d4', 7, 'मक्की के', 1, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(28, '936c3c12-ce0c-4d6c-987f-53d0c9969844', 7, 'गेहूँ के', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(29, 'c05aa833-e96c-4d73-9783-a54dab7d4cee', 8, 'पक्षियों के लिए', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(30, '729ce669-598b-44be-8dcb-83ab7462849c', 8, 'अपने लिए', 1, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(31, '56a5933b-e43b-498f-b8ab-c50d30ad1032', 8, 'वन्य प्राणियों के लिए', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(32, '2cfa93d5-bf9d-4d45-af16-0dafe5c96262', 8, 'बूढ़े वन बाबा के लिए', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(33, '65ca4fc4-dc02-471b-a478-8253ec0f9caa', 9, 'मिट्टी से', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(34, '971a2496-936e-4408-9143-8ba27b8f4538', 9, 'जल से', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(35, '52235996-a8bc-4320-bfcb-0a12a0942631', 9, 'अन्न से', 1, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(36, 'b6c81d72-4413-469d-a27d-11b079372372', 9, 'नदी से', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(37, 'f064bdff-ad81-4dd2-aedd-6d01082307b8', 10, 'मोती - सी', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(38, 'b573004e-801c-40c0-a653-5086f99a5a1a', 10, 'दाने - सी', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(39, '654cd321-4d4a-42cb-9849-0843c928896c', 10, 'छोटी - सी', 1, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(40, '4a2a2133-8b9e-401f-b18f-c4175db1d495', 10, 'बड़ी - सी', 0, '2025-12-23 15:58:20', '2025-12-23 15:58:20', NULL),
(41, 'c4099afd-bd17-407f-9318-d81cc91a734e', 11, 'Ruskin Bond', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(42, '8ee5e3fa-474d-4412-b0df-4a123e1f5c41', 11, 'R.K.Narayan', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(43, '9c004618-6f54-4cb0-82d2-00b128cb40b3', 11, 'Isaac Asimov', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(44, 'a36e38f7-ae34-43bc-95cd-724f9ede4571', 11, 'Robert Frost', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(45, 'ce0d4915-308b-4fb3-a2f0-0847577c016b', 12, 'A diary', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(46, '4988cce6-d76b-4ffa-84cb-e8aa8789b1cd', 12, 'A printed book', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(47, 'bfe738c8-613b-4a6d-b138-96bd5cc034ac', 12, 'A telebook', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(48, '184e9880-01a7-4613-bebe-f49eac1e5d03', 12, 'A letter', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(49, 'f941b56c-2087-4413-8b7c-61affd0078f1', 13, '17 May 2057', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(50, '9ac9d1e0-d58f-4a24-b42c-fadc60e6ea00', 13, '17 May 2257', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(51, '2e05be58-a80c-4955-b0a9-1e83124ea62f', 13, '17 May 2157', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(52, '00be26c2-a08d-4b70-9d1d-21c5acbbe57e', 13, '17 May 1957', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(53, '5539d9bb-835b-421c-a7f8-f8aecd317824', 14, 'It was a storybook', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(54, 'dcacf1f8-37c5-42db-a996-ea0f26861810', 14, 'It was new', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(55, '87908794-eaf5-4f36-ab0d-383a1781667d', 14, 'It was very old and printed on paper', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(56, '3729461e-b6ea-4ccb-9e43-1829f31c23c0', 14, 'It was a digital book', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(57, '39f3c905-aa9e-4ec6-b0dd-07eaf7089643', 15, 'Her grandfather', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(58, 'ac8f31d2-b8fb-415b-8659-4ceddc57a7a5', 15, 'Her mother', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(59, 'dec43ea7-8180-4808-accc-e6f5ca5b579d', 15, 'Her teacher', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(60, 'e47eea7c-f40d-47a1-9321-6a37330bd81a', 15, 'Her father', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(61, '4da9e543-cf08-4b12-a78e-05721d67de6c', 16, 'Ten', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(62, 'f8407385-915a-4b6b-8ccb-db15fae4bca6', 16, 'Eleven', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(63, '6c12a856-3bf6-46a1-8958-9046af4f599e', 16, 'Twelve', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(64, '463f2902-cf2a-4ae8-ba06-0be0506e9afb', 16, 'Thirteen', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(65, 'a6e1ad49-2157-40d1-8fa7-f8432a40b289', 17, 'Eleven', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(66, 'a2a6b326-a6f2-4cea-89f0-b00521c9766b', 17, 'Twelve', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(67, '423aa351-f641-440f-a0cb-f6d955d2d91e', 17, 'Thirteen', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(68, '389cef7a-d347-435f-8bc1-0ea2d4270dea', 17, 'Fourteen', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(69, '13b5cb9b-a3d2-404e-967a-25737bf355a0', 18, 'In the attic', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(70, 'f1579aab-dc92-41a4-b88d-957cdafb4b11', 18, 'In his schoolroom', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(71, '9b449dda-b8f1-4b22-870e-a18c7cbed0ff', 18, 'In Margie’s house', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(72, 'eb57698a-9378-47f8-a103-c1cf277072d4', 18, 'In the basement', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(73, 'b0779b59-0563-47be-963d-e5e841959624', 19, 'Robots', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(74, '539dac75-e84a-48a5-8a5b-16f549bb597d', 19, 'School', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(75, '319c7f5b-4d19-4164-8a94-b433e2eeaaa3', 19, 'Music', 1, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(76, 'efdba330-0b15-40eb-9be8-4cf97d5bd4ac', 19, 'History', 0, '2025-12-23 16:11:32', '2025-12-23 16:11:32', NULL),
(77, 'c737b38a-118b-44c0-a77e-de767ae6ea5e', 20, 'She liked it', 0, '2025-12-23 16:11:33', '2025-12-23 16:11:33', NULL),
(78, 'f2f83ac8-31c2-47c3-81c7-8ee84804e3f3', 20, 'She hated it', 0, '2025-12-23 16:11:33', '2025-12-23 16:11:33', NULL),
(79, 'b88fa2cd-7968-43c6-859b-9741ef7ff791', 20, 'She found it fun', 1, '2025-12-23 16:11:33', '2025-12-23 16:11:33', NULL),
(80, '7a1ff627-f0b4-4042-b07e-a1b638a3b2e8', 20, 'She loved it', 0, '2025-12-23 16:11:33', '2025-12-23 16:11:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment_question_type`
--

CREATE TABLE `assessment_question_type` (
  `id` bigint(20) NOT NULL,
  `assessment_question_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_question_type`
--

INSERT INTO `assessment_question_type` (`id`, `assessment_question_type_uuid`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'e5f1e43a-f0f1-4b76-b9de-2309a5f1333d', 'MCQ', 'Multiple Choice Question', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'c0b7c22f-44ef-40f8-adc7-288abdbb5338', 'MAQ', 'Multiple Answer Question', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, '36fafeb4-1b10-4cd7-8d83-ce6d3604ea0e', 'TRUE_FALSE', 'True or False Question', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, 'b6e2820c-6995-46cd-8b81-4be79a800866', 'FILL_BLANK', 'Fill in the Blank Question', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, 'a85ff8a6-6bce-4082-83de-e73ca9177739', 'DESCRIPTIVE', 'Descriptive / Subjective Question', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_student_answer`
--

CREATE TABLE `assessment_student_answer` (
  `id` bigint(20) NOT NULL,
  `student_assessment_result_id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL,
  `selected_option_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of option IDs for MCQ/MAQ questions' CHECK (json_valid(`selected_option_ids`)),
  `answer_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `marks_obtained` float DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_student_answer`
--

INSERT INTO `assessment_student_answer` (`id`, `student_assessment_result_id`, `question_id`, `selected_option_ids`, `answer_text`, `is_correct`, `marks_obtained`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '[\"86f29e22-be23-4c35-98d3-69e9420f3f4b\"]', NULL, 1, 1, '2025-12-23 17:05:05', '2025-12-23 17:05:05', NULL),
(2, 1, 2, '[\"cecddbe4-71d8-4874-bf1d-1dd496ab0735\"]', NULL, 1, 1, '2025-12-23 17:05:10', '2025-12-23 17:05:10', NULL),
(3, 1, 3, '[\"bd854ce8-6c92-45c7-8e31-6834546f8203\"]', NULL, 0, 0, '2025-12-23 17:05:15', '2025-12-23 17:05:15', NULL),
(4, 1, 4, '[\"82ad9786-d4af-44b2-9edb-5ff8b59e48de\"]', NULL, 0, 0, '2025-12-23 17:05:19', '2025-12-23 17:05:19', NULL),
(5, 1, 5, '[\"c5575638-79a5-4638-82d9-1e07b68ce605\"]', NULL, 0, 0, '2025-12-23 17:05:23', '2025-12-23 17:05:23', NULL),
(6, 1, 6, '[\"8a29752d-402c-4d0a-8815-b28c9299309c\"]', NULL, 0, 0, '2025-12-23 17:05:27', '2025-12-23 17:05:27', NULL),
(7, 1, 7, '[\"975e9093-bac8-49f4-9b61-827df81581d4\"]', NULL, 1, 1, '2025-12-23 17:05:36', '2025-12-23 17:05:36', NULL),
(8, 1, 8, '[\"729ce669-598b-44be-8dcb-83ab7462849c\"]', NULL, 1, 1, '2025-12-23 17:05:37', '2025-12-23 17:05:37', NULL),
(9, 1, 9, '[\"65ca4fc4-dc02-471b-a478-8253ec0f9caa\"]', NULL, 0, 0, '2025-12-23 17:05:41', '2025-12-23 17:05:41', NULL),
(10, 1, 10, '[\"654cd321-4d4a-42cb-9849-0843c928896c\"]', NULL, 1, 1, '2025-12-23 17:05:49', '2025-12-23 17:05:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assessment_type`
--

CREATE TABLE `assessment_type` (
  `id` bigint(20) NOT NULL,
  `assessment_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `assessment_type_name` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_course_assessment` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assessment_type`
--

INSERT INTO `assessment_type` (`id`, `assessment_type_uuid`, `assessment_type_name`, `description`, `created_at`, `updated_at`, `deleted_at`, `is_course_assessment`) VALUES
(1, '0253b4c1-1884-4d5a-84e0-c64e8843c1b2', 'Unit Test', 'Test conducted for a single unit or chapter', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL, 0),
(2, '51987cd7-84d6-4d49-b12d-0e7031620de2', 'Periodic Test', 'Test conducted periodically to assess overall progress', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL, 0),
(3, '2707443e-ed57-40b1-be46-60ff5dfcb215', 'Quiz', 'Short test or online quiz for quick assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(4, 'e4451248-5f78-42b2-8c70-f3393466f8c9', 'Mid-Term Examination', 'Examination covering first half of syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(5, '52e0584a-38d5-409a-abf4-d00c6305f301', 'Final Examination', 'Examination covering the full syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(6, '13dc6c6b-db4b-4982-be0b-2dd0e2592b8c', 'Project', 'Assessment based on project work or assignments', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(7, '82e252cd-5b5c-45a2-ad09-e490e8ae29c1', 'Practical', 'Lab-based practical assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(8, 'a2689b87-be66-4aa6-bd83-58dfcb28ea25', 'Oral Test', 'Assessment conducted orally', '2025-12-22 13:06:49', '2025-12-22 13:06:49', '2025-12-22 13:06:49', 0),
(9, '2b5f617f-5d90-49fc-a4da-cf3ef233ec58', 'Course Assessment', 'Assessment linked to specific courses, used to evaluate learner performance and determine course completion.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `caste_categories`
--

CREATE TABLE `caste_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `caste_categories`
--

INSERT INTO `caste_categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'General (GEN)', 'Unreserved category', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(2, 'Other Backward Class (OBC)', 'OBC – Non-Creamy Layer category', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(3, 'Scheduled Caste (SC)', 'SC – Reserved category', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(4, 'Scheduled Tribe (ST)', 'ST – Reserved category', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(5, 'Economically Weaker Section (EWS)', 'EWS – General category with economic reservation', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(6, 'Minority', 'For candidates belonging to minority communities', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(7, 'Others', 'Other categories not listed above', '2025-12-22 13:06:49', '2025-12-22 13:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `category_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_uuid`, `name`, `description`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '171f4fd7-6fd0-445b-8d49-59f1d980b70e', 'Programming', 'Courses and skills related to coding and software development.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, '8df413f7-afb1-4671-81ca-c02e1ad13037', 'Data Analysis', 'Skills for analyzing, visualizing, and interpreting data.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(3, 'abc004fd-e7cd-4286-ad96-1d80c082e575', 'Design', 'Creative and UI/UX design related skills.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(4, '638bc63a-cd3f-4c3e-98c7-5224f4c5d4d0', 'Soft Skills', 'Communication, teamwork, and leadership skills.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(5, '4573e3e4-222a-4092-8732-ac09b8a4bd9c', 'Teaching', 'Skills to enhance classroom management and teaching methods.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(6, '3fb502f7-2514-4837-a213-39810489f0e4', 'Other', 'Other category.', 1, '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `id` bigint(20) NOT NULL,
  `chapter_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `chapter_name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`id`, `chapter_uuid`, `chapter_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'db356e2c-c046-4072-a3ff-5c8a161bceba', 'Chapter 1', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'da6b5db8-2452-47a2-974f-6d7f3630a089', 'Chapter 2', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, 'a3817703-f693-4afe-b089-ff6cd0b020a5', 'Chapter 3', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, '93896c91-c728-4f7e-a8a0-97b55815e5d8', 'Chapter 4', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, '86a42958-c186-492a-83a6-4508ee7fa29b', 'Chapter 5', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(6, '70af0bfd-81ac-47f4-9140-feef5fef9f88', 'Chapter 6', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(7, 'f83aa612-b8e9-49b7-b381-094a1fffefa0', 'Chapter 7', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(8, '0c918d1e-7f1f-4892-991b-de42d241eff3', 'Chapter 8', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(9, '14fb9737-a254-4f71-901b-f8ac2ab15861', 'Chapter 9', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(10, 'c5c94445-5b9f-43ff-89ef-665768bba7ee', 'Chapter 10', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(11, 'fa414d78-765f-47ba-a8ed-f0b2acab200e', 'Chapter 11', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(12, '3d1d39f6-610b-4b00-98e3-dcec34148066', 'Chapter 12', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(13, '3a71d15d-09f8-4833-b44f-ffa00944ca5c', 'Chapter 13', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(14, '69ff289b-253e-4685-972a-ce73dc52db37', 'Chapter 14', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(15, 'dbcdd821-bd5f-40f6-99f8-8aed1da7d25a', 'Chapter 15', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(16, '86f3faad-f83b-48dc-b2ab-cccd0cca42ce', 'Chapter 16', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(17, '4222af55-ebff-4b7e-ae91-187ae3321967', 'Chapter 17', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(18, '0f856c35-55c2-4179-8a11-22a2c8278639', 'Chapter 18', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(19, '10995d60-5ed7-456b-af2e-08dbae9b0356', 'Chapter 19', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(20, '4934f4c5-ad8b-4407-a8c1-b180c6dbff5f', 'Chapter 20', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `state_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `state_id`, `created_at`, `updated_at`) VALUES
(1, 'Bambooflat', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(2, 'Port Blair', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(3, 'Diglipur', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(4, 'Mayabunder', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(5, 'Rangat', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(6, 'Neil Island', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(7, 'Long Island', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(8, 'Wandoor', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(9, 'Car Nicobar', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(10, 'Vijayawada', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(11, 'Guntur', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(12, 'Kurnool', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(13, 'Rajahmundry', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(14, 'Nellore', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(15, 'Kakinada', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(16, 'Vizianagaram', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(17, 'Chittoor', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(18, 'Tirupati', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(19, 'Anantapur', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(20, 'Kadapa', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(21, 'Machilipatnam', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(22, 'Amaravati', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(23, 'Eluru', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(24, 'Sri Potti Sriramulu Nellore', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(25, 'Amalapuram', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(26, 'Mangalagiri', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(27, 'Srikalahasti', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(28, 'Srikakulam', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(29, 'Gudivada', 2, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(30, 'Aalo', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(31, 'Anini', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(32, 'Basar', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(33, 'Boleng', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(34, 'Bomdila', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(35, 'Changlang', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(36, 'Daporijo', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(37, 'Deomali', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(38, 'Dirang', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(39, 'Hawai', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(40, 'Itanagar', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(41, 'Jairampur', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(42, 'Khonsa', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(43, 'Koloriang', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(44, 'Miao', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(45, 'Naharlagun', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(46, 'Namsai', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(47, 'Pasighat', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(48, 'Roing', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(49, 'Rupa', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(50, 'Sagalee', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(51, 'Seppa', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(52, 'Tawang', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(53, 'Tezu', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(54, 'Yingkiong', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(55, 'Ziro', 3, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(56, 'Guwahati', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(57, 'Jorhat', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(58, 'Tezpur', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(59, 'Dibrugarh', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(60, 'Bongaigaon', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(61, 'Silchar', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(62, 'Golaghat', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(63, 'Barpeta', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(64, 'Hailakandi', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(65, 'Kokrajhar', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(66, 'Haflong', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(67, 'Cachar', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(68, 'Sonitpur', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(69, 'Karbi Anglong', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(70, 'Diphu', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(71, 'Dispur', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(72, 'Digboi', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(73, 'Shillong', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(74, 'Bilasipara', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(75, 'Chabua', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(76, 'Gohpur', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(77, 'Kharupetia', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(78, 'Bokajan', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(79, 'Rangapara', 4, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(80, 'Patna', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(81, 'Gaya', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(82, 'Bhagalpur', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(83, 'Darbhanga', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(84, 'Begusarai', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(85, 'Buxar', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(86, 'Munger', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(87, 'Saharsa', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(88, 'Nawada', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(89, 'Sasaram', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(90, 'Bihar Sharif', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(91, 'Chhapra', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(92, 'Arrah', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(93, 'Bettiah', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(94, 'Hajipur', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(95, 'Danapur', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(96, 'Muzaffarpur', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(97, 'Katihar', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(98, 'Motihari', 5, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(99, 'Chandigarh', 6, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(100, 'Raipur', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(101, 'Mahasamund', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(102, 'Bilaspur', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(103, 'Raigarh', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(104, 'Korba', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(105, 'Rajnandgaon', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(106, 'Dhamtari', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(107, 'Kanker', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(108, 'Bhilai', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(109, 'Sakti', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(110, 'Sarangarh', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(111, 'Khairagarh', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(112, 'Ratanpur', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(113, 'Mungeli', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(114, 'Durg', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(115, 'Balrampur', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(116, 'Atal Nagar-Nava Raipur', 7, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(117, 'Silvassa', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(118, 'Naroli', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(119, 'Khanvel', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(120, 'Rakholi', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(121, 'Dadra', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(122, 'Dudhani', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(123, 'Saily', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(124, 'Vapi ', 8, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(125, 'Daman', 9, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(126, 'Ghoghla', 9, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(127, 'Diu', 9, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(128, 'New Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(129, 'North Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(130, 'South Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(131, 'East Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(132, 'West Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(133, 'Central Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(134, 'North East Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(135, 'North West Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(136, 'South West Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(137, 'South East Delhi', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(138, 'Shahdara', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(139, 'Dwarka', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(140, 'Narela', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(141, 'Rohini', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(142, 'Connaught Place', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(143, 'Karol Bagh', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(144, 'Chandni Chowk', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(145, 'Paharganj', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(146, 'Hauz Khas', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(147, 'Saket', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(148, 'Vasant Kunj', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(149, 'Lajpat Nagar', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(150, 'Janakpuri', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(151, 'Patel Nagar', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(152, 'Rajouri Garden', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(153, 'Dilshad Garden', 10, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(154, 'Panaji', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(155, 'Margao', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(156, 'Ponda', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(157, 'Canacona', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(158, 'Vasco da Gama', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(159, 'Valpoi', 11, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(160, 'Ahmedabad', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(161, 'Vadodara', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(162, 'Surat', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(163, 'Gandhinagar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(164, 'Rajkot', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(165, 'Jamnagar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(166, 'Bhavnagar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(167, 'Junagadh', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(168, 'Porbandar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(169, 'Bharuch', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(170, 'Patan', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(171, 'Valsad', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(172, 'Surendranagar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(173, 'Dahod', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(174, 'Morbi', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(175, 'Gondal', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(176, 'Kalol', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(177, 'Dwarka', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(178, 'Navsari', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(179, 'Amreli', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(180, 'Bhuj', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(181, 'Gandhidham', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(182, 'Himatnagar', 12, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(183, 'Gurgaon', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(184, 'Faridabad', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(185, 'Karnal', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(186, 'Ambala', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(187, 'Panipat', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(188, 'Panchkula', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(189, 'Hisar', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(190, 'Kurukshetra', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(191, 'Rewari', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(192, 'Sonipat', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(193, 'Jind', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(194, 'Kaithal', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(195, 'Sirsa', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(196, 'Palwal', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(197, 'Yamunanagar', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(198, 'Narnaul', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(199, 'Ambala Sadar', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(200, 'Rohtak', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(201, 'Bhiwani', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(202, 'Mahendragarh', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(203, 'Bahadurgarh', 13, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(204, 'Shimla', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(205, 'Dharamsala', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(206, 'Kullu', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(207, 'Kangra', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(208, 'Chamba', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(209, 'Solan', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(210, 'Hamirpur', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(211, 'Manali', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(212, 'Palampur', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(213, 'Kasauli', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(214, 'Nahan', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(215, 'Dalhousie', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(216, 'Baddi', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(217, 'Narkanda', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(218, 'Chail', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(219, 'Paonta Sahib', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(220, 'Kufri', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(221, 'Baijnath', 14, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(222, 'Srinagar', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(223, 'Jammu', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(224, 'Anantnag', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(225, 'Pahalgam', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(226, 'Kathua', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(227, 'Rajouri', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(228, 'Doda', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(229, 'Leh', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(230, 'Ganderbal', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(231, 'Kishtwar', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(232, 'Gulmarg', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(233, 'Katra', 15, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(234, 'Ranchi', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(235, 'Dhanbad', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(236, 'Jamshedpur', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(237, 'Hazaribagh', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(238, 'Bokaro Steel City', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(239, 'Deoghar', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(240, 'Giridih', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(241, 'Medininagar', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(242, 'Ramgarh', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(243, 'Phusro', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(244, 'Chirkunda', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(245, 'Jhumri Telaiya', 16, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(246, 'Bangalore', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(247, 'Mangalore', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(248, 'Bidar', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(249, 'Bijapur', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(250, 'Belgaum', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(251, 'Mandya', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(252, 'Hassan', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(253, 'Davanagere', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(254, 'Bellary', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(255, 'Shimoga', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(256, 'Gulbarga', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(257, 'Chikmagalur', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(258, 'Hospet', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(259, 'Raichur', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(260, 'Bagalkot', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(261, 'Bhadravati', 17, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(262, 'Kochi', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(263, 'Thiruvananthapuram', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(264, 'Kozhikode', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(265, 'Kottayam', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(266, 'Thrissur', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(267, 'Kollam', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(268, 'Wayanad', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(269, 'Kannur', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(270, 'Alappuzha', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(271, 'Malappuram', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(272, 'Palakkad', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(273, 'Kasaragod', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(274, 'Ernakulam', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(275, 'Idukki', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(276, 'Pathanamthitta', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(277, 'Aluva', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(278, 'Punalur', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(279, 'Varkala', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(280, 'Nilambur', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(281, 'Mannarkkad', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(282, 'Ottapalam', 18, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(283, 'Kargil', 19, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(284, 'Leh', 19, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(285, 'Kavaratti', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(286, 'Lakshadweep', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(287, 'Amini', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(288, 'Andrott', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(289, 'Kadmat', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(290, 'Kalpeni', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(291, 'Minicoy', 20, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(292, 'Bhopal', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(293, 'Indore', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(294, 'Gwalior', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(295, 'Jabalpur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(296, 'Ujjain', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(297, 'Dewas', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(298, 'Burhanpur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(299, 'Narmadapuram', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(300, 'Chhindwara', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(301, 'Chhatarpur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(302, 'Betul', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(303, 'Khargone', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(304, 'Vidisha', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(305, 'Orchha', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(306, 'Mandav', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(307, 'Bhind', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(308, 'Rewa', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(309, 'Sagar', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(310, 'Satna', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(311, 'Ratlam', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(312, 'Khandwa', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(313, 'Katni', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(314, 'Guna', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(315, 'Shivpuri', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(316, 'Morena', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(317, 'Itarsi', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(318, 'Hoshangabad', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(319, 'Mandsaur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(320, 'Neemuch', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(321, 'Chhatarpur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(322, 'Damoh', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(323, 'Sehore', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(324, 'Pithampur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(325, 'Singrauli', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(326, 'Shahdol', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(327, 'Harda', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(328, 'Betul', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(329, 'Balaghat', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(330, 'Rajgarh', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(331, 'Mandla', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(332, 'Narsinghpur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(333, 'Anuppur', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(334, 'Seoni', 21, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(335, 'Pune', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(336, 'Mumbai', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(337, 'Nagpur', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(338, 'Aurangabad', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(339, 'Nashik', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(340, 'Kolhapur', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(341, 'Amravati', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(342, 'Solapur', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(343, 'Thane', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(344, 'Akola', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(345, 'Chandrapur', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(346, 'Nanded', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(347, 'Ahmednagar', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(348, 'Jalna', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(349, 'Satara', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(350, 'Navi Mumbai', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(351, 'Gondia', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(352, 'Yavatmal', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(353, 'Vasai-Virar', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(354, 'Raigad', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(355, 'Ulhasnagar', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(356, 'Ambarnath', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(357, 'Bhandara', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(358, 'Malegaon', 22, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(359, 'Imphal', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(360, 'Thoubal', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(361, 'Kakching', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(362, 'Bishnupur', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(363, 'Churachandpur', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(364, 'Senapati', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(365, 'Ukhrul', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(366, 'Tamenglong', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(367, 'Moreh', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(368, 'Mao', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(369, 'Jiribam', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(370, 'Chandel', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(371, 'Tengnoupal', 23, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(372, 'Shillong', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(373, 'Tura', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(374, 'Jowai', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(375, 'Nongpoh', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(376, 'Baghmara', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(377, 'Williamnagar', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(378, 'Resubelpara', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(379, 'Khliehriat', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(380, 'Mawkyrwat', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(381, 'Nongstoin', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(382, 'Sohra', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(383, 'Mairang', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(384, 'Ampati', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(385, 'Amlarem', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(386, 'Dawki', 24, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(387, 'Aizawl', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(388, 'Lunglei', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(389, 'Saiha', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(390, 'Champhai', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(391, 'Kolasib', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(392, 'Serchhip', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(393, 'Lawngtlai', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(394, 'Mamit', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(395, 'Hnahthial', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(396, 'Saitual', 25, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(397, 'Kohima', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(398, 'Dimapur', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(399, 'Mokokchung', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(400, 'Tuensang', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(401, 'Wokha', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(402, 'Zunheboto', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(403, 'Mon', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(404, 'Phek', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(405, 'Longleng', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(406, 'Peren', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(407, 'Kiphire', 26, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(408, 'Bhubaneswar', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(409, 'Cuttack', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(410, 'Rourkela', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(411, 'Berhampur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(412, 'Sambalpur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(413, 'Puri', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(414, 'Balasore', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(415, 'Bhadrak', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(416, 'Baripada', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(417, 'Jharsuguda', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(418, 'Bargarh', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(419, 'Kendujhar', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(420, 'Koraput', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(421, 'Rayagada', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(422, 'Dhenkanal', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(423, 'Jagatsinghpur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(424, 'Paradeep', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(425, 'Anugul', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(426, 'Jajpur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(427, 'Khurda', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(428, 'Nayagarh', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(429, 'Sundargarh', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(430, 'Kendrapara', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(431, 'Phulabani', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(432, 'Talcher', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(433, 'Paradip', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(434, 'Balangir', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(435, 'Rajgangpur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(436, 'Sonepur', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(437, 'Bolangir', 27, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(438, 'Puducherry ', 28, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(439, 'Karaikal', 28, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(440, 'Mahe', 28, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(441, 'Yanam', 28, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(442, 'Chandigarh', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(443, 'Ludhiana', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(444, 'Amritsar', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(445, 'Jalandhar', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(446, 'Patiala', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(447, 'Bathinda', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(448, 'Hoshiarpur', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(449, 'Mohali', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(450, 'Batala', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(451, 'Pathankot', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(452, 'Moga', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(453, 'Firozpur', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(454, 'Kapurthala', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(455, 'Gurdaspur', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(456, 'Sangrur', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(457, 'Faridkot', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(458, 'Mansa', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(459, 'Barnala', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(460, 'Rajpura', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(461, 'Nabha', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(462, 'Abohar', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(463, 'Malerkotla', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(464, 'Khanna', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(465, 'Sunam', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(466, 'Dhuri', 29, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(467, 'Beawar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(468, 'Pali', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(469, 'Jaipur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(470, 'Alwar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(471, 'Baran', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(472, 'Dholpur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(473, 'Udaipur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(474, 'Bikaner', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(475, 'Tonk', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(476, 'Jodhpur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(477, 'Ajmer', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(478, 'Bharatpur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(479, 'Sikar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(480, 'Bhilwara', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(481, 'Hanumangarh', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(482, 'Sri Ganganagar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(483, 'Kishangarh', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(484, 'Banswara', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(485, 'Bhiwadi', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(486, 'Kota', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(487, 'Dungarpur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(488, 'Gangapur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(489, 'Sawai Madhopur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(490, 'Nagaur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(491, 'Jhunjhunu', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(492, 'Churu', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(493, 'Phalodi', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(494, 'Chittorgarh', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(495, 'Hindaun', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(496, 'Bundi', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(497, 'Behror', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(498, 'Sujangarh', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(499, 'Sanchore', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(500, 'Neem Ka Thana', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(501, 'Deeg', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(502, 'Kekri', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(503, 'Salumbar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(504, 'Jaisalmer', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(505, 'Khairthal', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(506, 'Balotra', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(507, 'Dausa', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(508, 'Rajsamand', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(509, 'Merta', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(510, 'Shrimadhopur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(511, 'Sumerpur', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(512, 'Nohar', 30, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(513, 'Gangtok', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(514, 'Namchi', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(515, 'Mangan', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(516, 'Gyalshing', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(517, 'Singtam', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(518, 'Rangpo', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(519, 'Jorethang', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(520, 'Pakyong', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(521, 'Rabongla', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(522, 'Soreng', 31, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(523, 'Chennai', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(524, 'Coimbatore', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(525, 'Madurai', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(526, 'Tiruchirappalli', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(527, 'Salem', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(528, 'Tirunelveli', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(529, 'Erode', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(530, 'Vellore', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(531, 'Thoothukudi', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(532, 'Thanjavur', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(533, 'Nagercoil', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(534, 'Dindigul', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(535, 'Cuddalore', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(536, 'Kanchipuram', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(537, 'Tiruvannamalai', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(538, 'Karur', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(539, 'Ooty', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(540, 'Krishnagiri', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(541, 'Pudukkottai', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(542, 'Kumbakonam', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(543, 'Karaikudi', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(544, 'Hosur', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(545, 'Dharmapuri', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(546, 'Thiruvallur', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(547, 'Viluppuram', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(548, 'Namakkal', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(549, 'Ramanathapuram', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(550, 'Mayiladuthurai', 32, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(551, 'Hyderabad', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(552, 'Secunderabad', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(553, 'Warangal', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(554, 'Nizamabad', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(555, 'Karimnagar', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(556, 'Ramagundam', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(557, 'Khammam', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(558, 'Mahabubnagar', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(559, 'Nalgonda', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(560, 'Adilabad', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(561, 'Siddipet', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(562, 'Suryapet', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(563, 'Jagtial', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(564, 'Nirmal', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(565, 'Mancherial', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(566, 'Kamareddy', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(567, 'Medak', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(568, 'Vikarabad', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(569, 'Wanaparthy', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(570, 'Sangareddy', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(571, 'Palwancha', 33, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(572, 'Agartala', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(573, 'Udaipur', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(574, 'Dharmanagar', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(575, 'Belonia', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(576, 'Ambassa', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(577, 'Kailasahar', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(578, 'Sonamura', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(579, 'Santirbazar', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(580, 'Kumarghat', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(581, 'Sabroom', 34, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(582, 'Lucknow', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(583, 'Kanpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(584, 'Varanasi', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(585, 'Agra', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(586, 'Allahabad', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(587, 'Ghaziabad', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(588, 'Noida', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(589, 'Meerut', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(590, 'Aligarh', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(591, 'Bareilly', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(592, 'Moradabad', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(593, 'Saharanpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(594, 'Gorakhpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(595, 'Jhansi', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(596, 'Muzaffarnagar', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(597, 'Mathura', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(598, 'Rampur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(599, 'Faizabad', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(600, 'Azamgarh', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(601, 'Firozabad', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(602, 'Basti', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(603, 'Shahjahanpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(604, 'Mirzapur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(605, 'Jaunpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(606, 'Ballia', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(607, 'Hapur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(608, 'Etawah', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(609, 'Bijnor', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(610, 'Loni', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(611, 'Rae Bareli', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(612, 'Orai', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(613, 'Bahraich', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(614, 'Sambhal', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(615, 'Sultanpur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(616, 'Amroha', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(617, 'Hardoi', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(618, 'Raebareli', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(619, 'Unnao', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(620, 'Sitapur', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(621, 'Hathras', 35, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(622, 'Dehradun', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(623, 'Haridwar', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(624, 'Rishikesh', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(625, 'Haldwani', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(626, 'Nainital', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(627, 'Almora', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(628, 'Kashipur', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(629, 'Mussoorie', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(630, 'New Tehri', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(631, 'Chamoli', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(632, 'Pithoragarh', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(633, 'Bageshwar', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(634, 'Ranikhet', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(635, 'Kotdwar', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(636, 'Srinagar', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(637, 'Uttarkashi', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(638, 'Joshimath', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(639, 'Gangotri', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(640, 'Yamunotri', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(641, 'Badrinath', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(642, 'Kedarnath', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(643, 'Bhimtal', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(644, 'Pauri', 36, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(645, 'Kolkata', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(646, 'Howrah', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(647, 'Durgapur', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(648, 'Asansol', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(649, 'Siliguri', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(650, 'Bardhaman', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(651, 'Malda', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(652, 'Bardhaman', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(653, 'Kharagpur', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(654, 'Krishnanagar', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(655, 'Haldia', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(656, 'Raiganj', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(657, 'Bankura', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(658, 'Jalpaiguri', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(659, 'Cooch Behar', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(660, 'Alipurduar', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(661, 'Purulia', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(662, 'Darjeeling', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(663, 'Balurghat', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(664, 'Kalimpong', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(665, 'Ranaghat', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(666, 'Rampurhat', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(667, 'Murshidabad', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(668, 'Berhampore', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(669, 'Suri', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(670, 'Arambagh', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(671, 'Tamluk', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(672, 'Bakreswar', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(673, 'Bishnupur', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(674, 'Kalyani', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(675, 'Barasat', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(676, 'Bongaon', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(677, 'Baranagar', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(678, 'Chinsurah', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(679, 'Nabadwip', 37, '2025-12-22 13:06:48', '2025-12-22 13:06:48');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` bigint(20) NOT NULL,
  `class_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `class_name` varchar(150) NOT NULL,
  `school_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `class_uuid`, `class_name`, `school_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '4a8528ac-7494-426e-a5f7-3e1533b54a96', 'Class 6th', 1, '2025-12-23 10:16:46', '2025-12-23 10:16:46', NULL),
(2, 'efc2dbd8-fe52-4547-8a75-432b223513d8', 'Class 7th', 1, '2025-12-23 10:17:02', '2025-12-23 10:17:02', NULL),
(3, 'a86a103a-36b0-4295-b31b-b41952dafb80', 'Class 8th', 1, '2025-12-23 10:17:19', '2025-12-23 10:17:19', NULL),
(4, '84143580-5645-46bd-86ed-27a6969a8da1', 'Class 9th', 1, '2025-12-23 10:17:36', '2025-12-23 10:17:36', NULL),
(5, '058a88bf-5cc8-47e3-8d24-d18dda30304f', 'Class 10th', 1, '2025-12-23 10:17:51', '2025-12-23 10:17:51', NULL),
(6, 'be9bca60-d54c-4037-b6be-9d360248fb2f', 'Class 11th', 1, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(7, '93c76f1a-73a9-44b3-89de-03fcb3223fbb', 'Class 12th', 1, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_section`
--

CREATE TABLE `class_section` (
  `id` bigint(20) NOT NULL,
  `class_section_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `class_section_name` varchar(150) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `stream_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `class_section`
--

INSERT INTO `class_section` (`id`, `class_section_uuid`, `class_section_name`, `class_id`, `stream_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'b5c89610-cc0b-4be0-ba44-4bcaa130eab0', 'A', 1, NULL, '2025-12-23 10:16:46', '2025-12-23 10:16:46', NULL),
(2, '0296cb44-1a3e-4744-8799-ec25659c53f0', 'B', 1, NULL, '2025-12-23 10:16:46', '2025-12-23 10:16:46', NULL),
(3, 'ce05d8b2-98bd-43bd-ac04-8c8eb3138f12', 'C', 1, NULL, '2025-12-23 10:16:46', '2025-12-23 10:16:46', NULL),
(4, '997c3630-6999-4959-a1bc-7c2b73451760', 'A', 2, NULL, '2025-12-23 10:17:02', '2025-12-23 10:17:02', NULL),
(5, '7e10e896-38c9-4906-8263-ae1d6d4fdf29', 'B', 2, NULL, '2025-12-23 10:17:02', '2025-12-23 10:17:02', NULL),
(6, 'dfe5c248-f10e-40cb-a613-e4341a5af7a1', 'C', 2, NULL, '2025-12-23 10:17:02', '2025-12-23 10:17:02', NULL),
(7, 'f318e518-7f37-414d-be5b-cad115dd46ca', 'A', 3, NULL, '2025-12-23 10:17:19', '2025-12-23 10:17:19', NULL),
(8, 'e5050fac-d8af-4462-ae54-9f7cc853f53a', 'B', 3, NULL, '2025-12-23 10:17:19', '2025-12-23 10:17:19', NULL),
(9, '477adc56-1444-4922-b1ec-d492c64e5cc7', 'C', 3, NULL, '2025-12-23 10:17:19', '2025-12-23 10:17:19', NULL),
(10, 'a97e715e-47e3-41bc-b199-5542a128eeeb', 'A', 4, NULL, '2025-12-23 10:17:36', '2025-12-23 10:17:36', NULL),
(11, '2ad37eee-e398-451d-8535-18241e210a34', 'B', 4, NULL, '2025-12-23 10:17:36', '2025-12-23 10:17:36', NULL),
(12, 'ac81b908-64b9-40b8-838c-57ae67883994', 'C', 4, NULL, '2025-12-23 10:17:36', '2025-12-23 10:17:36', NULL),
(13, '9d383b61-d74f-4a64-8958-a91c28ba6270', 'A', 5, NULL, '2025-12-23 10:17:51', '2025-12-23 10:17:51', NULL),
(14, '547c0fbe-f861-4634-b6e7-79727af74d07', 'B', 5, NULL, '2025-12-23 10:17:51', '2025-12-23 10:17:51', NULL),
(15, '4d151bbe-c677-4d12-9981-51350f7e6742', 'C', 5, NULL, '2025-12-23 10:17:51', '2025-12-23 10:17:51', NULL),
(16, 'e5085fa6-d358-430e-ad21-aa4e74ca44c5', 'A', 6, 2, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(17, 'ed2feecb-c55d-4c64-90a9-ff66be68bb80', 'B', 6, 3, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(18, '75146519-1446-422e-bd97-647ddfa78006', 'C', 6, 5, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(19, '209361fe-6d66-44ff-8d8d-9f4a2eb368d7', 'D', 6, 4, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(20, 'c112028b-b660-4ee0-95e2-c8018a3fc1a1', 'E', 6, 1, '2025-12-23 10:18:27', '2025-12-23 10:18:27', NULL),
(21, '1a2d5367-31da-4dff-b6a5-837fc6de8373', 'A', 7, 2, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL),
(22, '144a8c6f-7fde-4590-92c6-9a27893cb870', 'B', 7, 3, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL),
(23, '1bc3f4c0-d98f-42f8-97b5-c06cda68dd09', 'C', 7, 5, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL),
(24, '88bbffec-c086-4eda-9863-a796564dcc02', 'D', 7, 4, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL),
(25, '5a7e0837-00a0-4d0d-ba44-0373de1b43ce', 'E', 7, 1, '2025-12-23 10:19:02', '2025-12-23 10:19:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `query` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `symbol` varchar(10) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `code`, `name`, `phone`, `symbol`, `currency`, `created_at`, `updated_at`) VALUES
(1, 'IN', 'India', 91, NULL, 'INR', '2025-12-22 13:06:48', '2025-12-22 13:06:48');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) NOT NULL,
  `course_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(1000) DEFAULT NULL COMMENT 'Course thumbnail image URL',
  `instructor_id` bigint(20) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'If true, visible to all students in the school',
  `class_id` bigint(20) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `difficulty_level_id` bigint(20) DEFAULT NULL,
  `course_type_id` bigint(20) DEFAULT NULL COMMENT 'References the type of course (e.g., self-paced, instructor-led)',
  `course_structure_type_id` bigint(20) DEFAULT NULL COMMENT 'References course structure (e.g., modular, chapter-based)',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_uuid`, `sub_category_id`, `title`, `description`, `thumbnail`, `instructor_id`, `is_public`, `class_id`, `start_date`, `end_date`, `difficulty_level_id`, `course_type_id`, `course_structure_type_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ad24369e-81bf-4b44-8abd-996e3fb8bc28', 3, 'Python Course', 'Python Course', 'public/courses/thumbnail_1766473110184.jpg', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-23 12:28:30', '2025-12-23 12:28:30', NULL),
(2, 'dac2b03b-b8f3-46ad-baab-83160d472922', 3, 'JAVA Course', 'JAVA Course', 'public/courses/thumbnail_1766473409796.webp', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-23 12:33:29', '2025-12-23 12:33:29', NULL),
(3, 'eb8dd022-f4c2-4a32-9ad0-9a205dd0044a', 3, 'HTML & CSS Full Course', 'HTML & CSS Full Course', 'public/courses/thumbnail_1766473604074.png', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-23 12:36:44', '2025-12-23 12:36:44', NULL),
(4, '16caf1c0-c27e-4225-813d-8275c1b62ece', 10, 'English Communication Course', 'English Communication Course', 'public/courses/thumbnail_1766474470246.jpg', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-23 12:51:10', '2025-12-23 12:51:10', NULL),
(5, '996744d7-d5a6-4bfd-8da5-3b8634bd769e', 10, 'English Communication Course Intermediate', 'English Communication Course Intermediate', 'public/courses/thumbnail_1766555596858.jpg', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 2, NULL, NULL, '2025-12-23 13:00:21', '2025-12-23 13:00:21', NULL),
(6, '21c0b363-488c-4eb4-adec-aa196bede95a', 10, 'English Communication Course Advance', 'English Communication Course Advance', 'public/courses/thumbnail_1766475368278.webp', 3, 1, NULL, '2025-12-23 00:00:00', '2026-12-31 00:00:00', 3, NULL, NULL, '2025-12-23 13:06:08', '2025-12-23 13:06:08', NULL),
(7, 'ea51e584-ad4c-46d2-bb1a-93196a8b2595', 10, 'Learn French Basics for Beginners', 'Learn French Basics for Beginners', 'public/courses/thumbnail_1766560248760.jpg', 4, 1, NULL, '2025-12-24 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-24 12:40:48', '2025-12-24 12:40:48', NULL),
(8, '146b9c8a-5a44-4bbd-a6a2-5b5698262a3b', 10, 'German for beginners', 'German for beginners', 'public/courses/thumbnail_1766560792658.jpg', 3, 1, NULL, '2025-12-24 00:00:00', '2026-12-31 00:00:00', 1, NULL, NULL, '2025-12-24 12:49:52', '2025-12-24 12:49:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_additional_documents`
--

CREATE TABLE `course_additional_documents` (
  `id` bigint(20) NOT NULL,
  `document_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `file_url` varchar(1000) NOT NULL COMMENT 'Path or URL of the uploaded document',
  `file_type` varchar(100) DEFAULT NULL COMMENT 'Type of file (pdf, docx, etc.)',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_class_section_link`
--

CREATE TABLE `course_class_section_link` (
  `id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `class_section_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_lessons`
--

CREATE TABLE `course_lessons` (
  `id` bigint(20) NOT NULL,
  `lesson_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `module_id` bigint(20) NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lesson_type` enum('video','document','quiz','assignment','other') NOT NULL DEFAULT 'video',
  `content_url` varchar(1000) DEFAULT NULL COMMENT 'URL of video/document/etc.',
  `order_index` int(11) NOT NULL DEFAULT 1,
  `duration_in_minutes` int(11) DEFAULT NULL,
  `is_preview` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'If true, lesson visible without enrollment',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course_lessons`
--

INSERT INTO `course_lessons` (`id`, `lesson_uuid`, `module_id`, `title`, `description`, `lesson_type`, `content_url`, `order_index`, `duration_in_minutes`, `is_preview`, `created_at`, `updated_at`) VALUES
(1, 'd2fdd812-1741-48f8-a63e-4a92fa0fdd20', 1, ' Python Full Course| Variables & Data Types | Lecture 1', ' Python Full Course| Variables & Data Types | Lecture 1', 'video', NULL, 1, 83, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(2, 'a53773d2-88ca-4ffe-956b-0d4dfd42f2c6', 1, ' Lecture 2 : Strings & Conditional Statements | Python Full Course', 'Lecture 2 : Strings & Conditional Statements | Python Full Course', 'video', NULL, 1, 55, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(3, '34a0c31b-597e-4b0c-bd7c-d77fa21a8d7d', 1, 'Lecture 3 : List & Tuple in Python | Python Full Course', 'Lecture 3 : List & Tuple in Python | Python Full Course\n', 'video', NULL, 1, 38, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(4, '7a06645f-5f18-4f42-8b84-2ab3b1dab73a', 1, 'Lecture 4 : Dictionary & Set in Python | Python Full Course', 'Lecture 4 : Dictionary & Set in Python | Python Full Course\n', 'video', NULL, 1, 54, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(5, 'b891ee3f-3e64-4137-bd2b-68a13898f34f', 1, 'New Lesson', '', 'video', NULL, 1, 63, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(6, '9b943541-cb5e-4505-9184-c8a1497878b5', 1, 'Lecture 6 : Functions & Recursion in Python | Python Full Course', 'Lecture 6 : Functions & Recursion in Python | Python Full Course\n', 'video', NULL, 1, 61, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(7, '3172f922-1332-4bc0-936a-43f401499fb6', 1, 'Lecture 7 : File Input/Output in Python', 'Lecture 7 : File Input/Output in Python\n', 'video', NULL, 1, 51, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(8, '00bf227f-23a6-4822-b666-36d718e43263', 1, 'Lecture 8 : OOPS in Python | Object Oriented Programming | Classes & Objects | Python Full Course', 'Lecture 8 : OOPS in Python | Object Oriented Programming | Classes & Objects | Python Full Course\n', 'video', NULL, 1, 57, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(9, '55dd9b69-af3b-4184-b242-da1052a7f214', 1, 'Lecture 9 : OOPS Part 2 | Object Oriented Programming | Python Full Course', 'Lecture 9 : OOPS Part 2 | Object Oriented Programming | Python Full Course\n', 'video', NULL, 1, 70, 0, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(10, '3ee7741b-6171-4f1d-a9b6-c56536c9cb94', 2, 'Java Full Course', 'Java Full Course', 'video', NULL, 1, 720, 0, '2025-12-23 12:33:29', '2025-12-23 12:33:29'),
(11, 'eb9d50a0-77b6-45af-ae49-5a74520c0a2d', 3, 'HTML & CSS Full Course', 'HTML & CSS Full Course', 'video', NULL, 1, 240, 0, '2025-12-23 12:36:44', '2025-12-23 12:36:44'),
(12, '4e14f262-c360-4756-a1be-47c9b271bf75', 4, 'Listening Conversations English Speaking Practice | Listen And Speak', 'Listening Conversations English Speaking Practice | Listen And Speak\n', 'video', NULL, 1, 9, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(13, 'b2920f05-3169-4724-9305-bdaab2bc8981', 4, 'Short Stories for Learning English | Past Continuous Story Listen & Speak', 'Short Stories for Learning English | Past Continuous Story Listen & Speak\n', 'video', NULL, 1, 5, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(14, '6c575ad2-bc5e-449e-9513-93f8ec3a5108', 4, 'English Listening and Speaking Practice | Past Simple Story', 'English Listening and Speaking Practice | Past Simple Story\n', 'video', NULL, 1, 6, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(15, 'ed28f1ce-7c31-495f-b818-ec4669de49c2', 4, 'Improve Your English Speaking Skills By Listening To Short Stories', 'Improve Your English Speaking Skills By Listening To Short Stories\n', 'video', NULL, 1, 8, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(16, '812810ee-0c31-4a7b-a5b3-a9aaaf788712', 4, 'Listen and Speak English Story For Simple Present Tense', 'Listen and Speak English Story For Simple Present Tense\n', 'video', NULL, 1, 10, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(17, '285e69f6-f1ea-402e-80e6-4f842bf8b00a', 4, 'Learning English Speaking By Listening Conversation | Comparative & Superlative', 'Learning English Speaking By Listening Conversation | Comparative & Superlative\n', 'video', NULL, 1, 10, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(18, '043f978a-f1b8-4db1-a670-cb2784a17b9f', 4, 'English Listening Story To Practice Speaking Daily Conversation in English', 'English Listening Story To Practice Speaking Daily Conversation in English\n', 'video', NULL, 1, 11, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(19, 'd53335d0-a088-43bb-b61d-3c61db3012e8', 4, 'Learn English Through Stories The Neighborhood Picnic | Listen and Speak English', 'Learn English Through Stories The Neighborhood Picnic | Listen and Speak English\n', 'video', NULL, 1, 14, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(20, '22a365b9-a01c-4983-a77a-38239dd29a21', 4, 'Talking About Daily Routines in English Conversations | Learn English Vocabulary', 'Talking About Daily Routines in English Conversations | Learn English Vocabulary\n', 'video', NULL, 1, 14, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(21, 'ad5e9019-f154-42a7-aa21-db4b1ebdc504', 4, 'Effortless English Course To Learn English Speaking', 'Effortless English Course To Learn English Speaking', 'video', NULL, 1, 7, 0, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(27, 'b5a957eb-3b85-412f-a297-a3c6470409dd', 6, 'Daily English Conversation Practice | Improve Your English Listening Comprehension', 'Daily English Conversation Practice | Improve Your English Listening Comprehension\n', 'video', NULL, 1, 12, 0, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(28, '3652f8ef-44dd-436a-9f1e-c2921a1cf909', 6, 'Listening English Conversation Practice | Learn English Holidays', 'Listening English Conversation Practice | Learn English Holidays\n', 'video', NULL, 1, 10, 0, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(29, '422009f7-46f6-48fe-aeea-e6f1d8a704f5', 6, 'English Conversation Practice | Daily Use English Sentences', 'English Conversation Practice | Daily Use English Sentences\n', 'video', NULL, 1, 30, 0, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(30, '3a7b0216-77d9-4f47-9548-2e975adbe311', 6, 'English Pronunciation Practice Listening Daily Conversation | Improve English Today', 'English Pronunciation Practice Listening Daily Conversation | Improve English Today\n', 'video', NULL, 1, 12, 0, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(31, 'b124e86f-e801-443c-9338-17a75c548950', 6, 'Real Life English Conversation Practice | Real English Phrasal Verbs', 'Real Life English Conversation Practice | Real English Phrasal Verbs\n', 'video', NULL, 1, 11, 0, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(32, '5a3cd417-993a-4c05-9c08-6e1d45a087e4', 7, 'Learning English Fairy Tales | Stories For Listening And Speaking Practice', 'Learning English Fairy Tales | Stories For Listening And Speaking Practice\n', 'video', NULL, 1, 14, 0, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(33, 'ce2bee31-615b-4906-a94d-08ddeb4547d4', 7, 'English Stories Course To Practice Listening and Speaking', 'English Stories Course To Practice Listening and Speaking\n', 'video', NULL, 1, 26, 0, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(34, '37b51336-49da-42fb-ae84-cd33192dde94', 7, 'Everyday English Conversation Practice | 30 Minutes English Listening', 'Everyday English Conversation Practice | 30 Minutes English Listening\n', 'video', NULL, 1, 34, 0, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(35, '12efddb8-2b35-4bce-9695-badd09169222', 7, 'Job interview Questions And Answers | Business English Conversation Practice', 'Job interview Questions And Answers | Business English Conversation Practice\n', 'video', NULL, 1, 18, 0, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(36, 'dceb4245-2913-42e4-96a1-7c0b004618a0', 7, 'Daily English Conversation Practice | Improve Your English Listening Comprehension', 'Daily English Conversation Practice | Improve Your English Listening Comprehension\n', 'video', NULL, 1, 12, 0, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(37, 'f5a96f41-be32-4905-a002-619cc7269c34', 8, 'Master the French Alphabet in Minutes', 'Master the French Alphabet in Minutes\n', 'video', NULL, 1, 7, 0, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(38, '026ca9a3-4e47-4b3a-9525-f23d789d5bc2', 8, 'How to Pronounce Words in French | Lesson 2', 'How to Pronounce Words in French | Lesson 2\n', 'video', NULL, 1, 8, 0, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(39, '1ced1fcf-e96b-4552-8f68-884a3d59820e', 8, 'How to Use Articles in French | The Language Tutor *Lesson 6*', 'How to Use Articles in French | The Language Tutor *Lesson 6*\n', 'video', NULL, 1, 10, 0, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(40, 'e9f25a3e-ffdf-4b8f-a51a-8d4819baf520', 8, 'How to Count in French | Lesson 7', 'How to Count in French | Lesson 7\n', 'video', NULL, 1, 10, 0, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(41, '7c8bf00c-1ecb-40e0-b732-6017da7afff7', 8, 'Using C\'est in French | The Language Tutor *Lesson 8*', 'Using C\'est in French | The Language Tutor *Lesson 8*\n', 'video', NULL, 1, 5, 0, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(42, '216d650e-3794-4609-9368-1c22e01bca8b', 9, 'A1 - Lesson 1 | Begrüßungen | Greetings | German for beginners | Learn German', 'A1 - Lesson 1 | Begrüßungen | Greetings | German for beginners | Learn German\n', 'video', NULL, 1, 11, 0, '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(43, 'bc2ebe4a-34b1-4040-b54d-914d64dfdb47', 9, 'A1 - Lesson 2 | Common Phrases | German for beginners | Learn German', 'A1 - Lesson 2 | Common Phrases | German for beginners | Learn German\n', 'video', NULL, 1, 11, 0, '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(44, 'bb3b1312-4007-46f0-9e16-6a8f2f6ff77c', 9, 'A1 - Lesson 3 | Numbers 0-20 | Zahlen | German for beginners | Learn German', 'A1 - Lesson 3 | Numbers 0-20 | Zahlen | German for beginners | Learn German\n', 'video', NULL, 1, 10, 0, '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(45, '02b0d59a-d723-490f-903b-211f21ee4ec1', 9, 'A1 - Lesson 4 | Numbers 21-100 | Zahlen | German for beginners | Learn German', 'A1 - Lesson 4 | Numbers 21-100 | Zahlen | German for beginners | Learn German\n', 'video', NULL, 1, 1, 0, '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(46, '9129832c-5310-4230-9882-7d365278abf9', 9, 'A1 - Lesson 5 | Alphabets | das Alphabet | German for beginners | Learn German', 'A1 - Lesson 5 | Alphabets | das Alphabet | German for beginners | Learn German\n', 'video', NULL, 1, 11, 0, '2025-12-24 12:49:52', '2025-12-24 12:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `course_modules`
--

CREATE TABLE `course_modules` (
  `id` bigint(20) NOT NULL,
  `module_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int(11) NOT NULL DEFAULT 1 COMMENT 'Defines display order of modules inside a course',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course_modules`
--

INSERT INTO `course_modules` (`id`, `module_uuid`, `course_id`, `title`, `description`, `order_index`, `created_at`, `updated_at`) VALUES
(1, '2a088929-4395-4189-9f21-dea521f3c51d', 1, ' Python Course', ' Python Course', 1, '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(2, '96b8060a-0d26-46bd-a1b8-cef9e0eb37ae', 2, 'Java Full Course', 'Java Full Course', 1, '2025-12-23 12:33:29', '2025-12-23 12:33:29'),
(3, '91bea191-03a3-459b-b28a-f02ce85dbb85', 3, 'HTML & CSS Full Course', 'HTML & CSS Full Course', 1, '2025-12-23 12:36:44', '2025-12-23 12:36:44'),
(4, 'ff4ff0a2-5b81-48ef-8de5-680433f05b8f', 4, 'English Communication Course', 'English Communication Course', 1, '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(6, '818d77c3-a02b-47c4-87d5-a8a781ec1240', 6, 'English Communication Course Advance', 'English Communication Course Advance', 1, '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(7, '7a84f411-91ed-4aad-b91f-9118c3669669', 5, 'English Communication Skills Course Intermediate', 'English Communication Skills Course Intermediate', 1, '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(8, 'cd895af4-71fa-4f5e-9c4c-1cacee1b3b16', 7, 'Master the French Alphabet in Minutes', 'Master the French Alphabet in Minutes\n', 1, '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(9, 'c30c1b39-8c0f-453e-874c-c59893ab173c', 8, 'A1 - Lesson 1 | Begrüßungen | Greetings | German for beginners | Learn German', 'A1 - Lesson 1 | Begrüßungen | Greetings | German for beginners | Learn German\n', 1, '2025-12-24 12:49:52', '2025-12-24 12:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `course_structure_types`
--

CREATE TABLE `course_structure_types` (
  `id` bigint(20) NOT NULL,
  `course_structure_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `title` varchar(250) NOT NULL COMMENT 'Type of course structure, e.g., Modular or Chapter-based',
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course_structure_types`
--

INSERT INTO `course_structure_types` (`id`, `course_structure_type_uuid`, `title`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'c765587e-993e-49a5-aa74-52c339e08ebe', 'Modular', 'Course content divided into independent modules or units.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, '3bddde3e-6a11-4a70-bd5f-ef808c0982a8', 'Chapter-based', 'Course organized into sequential chapters or lessons.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_types`
--

CREATE TABLE `course_types` (
  `id` bigint(20) NOT NULL,
  `course_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course_types`
--

INSERT INTO `course_types` (`id`, `course_type_uuid`, `title`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'dab9e416-636e-4e38-b824-cf92c1dcdf7b', 'Self-paced', 'Course that allows learners to progress at their own speed.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, '60496010-6248-4108-8e05-548f2beb4766', 'Instructor-led', 'Course guided by an instructor with scheduled sessions.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_video_links`
--

CREATE TABLE `course_video_links` (
  `id` bigint(20) NOT NULL,
  `video_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `video_url` varchar(1000) NOT NULL COMMENT 'Direct video URL or YouTube link',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `difficulty_levels`
--

CREATE TABLE `difficulty_levels` (
  `id` bigint(20) NOT NULL,
  `difficulty_level_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `difficulty_levels`
--

INSERT INTO `difficulty_levels` (`id`, `difficulty_level_uuid`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '91e7df6b-d83a-4522-9813-6b6832530a6c', 'Beginner', 'Suitable for learners starting from scratch.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, '3f7f7ed6-f50f-41b4-9a69-b130af0e3eda', 'Intermediate', 'For learners with some prior experience.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(3, '6146cebc-e0b0-4297-9441-f17b0c0c7418', 'Advanced', 'For expert-level learners seeking mastery.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` bigint(20) NOT NULL,
  `gender_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `gender_name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`, `gender_uuid`, `gender_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '741e6a18-4998-48f3-b083-af21b1dd957b', 'Male', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'e3b6db3b-041f-430e-84e9-95994fb9cf40', 'Female', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, 'b7c73a8f-1297-4885-84dd-f362ed7a4865', 'Other', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `id` bigint(20) NOT NULL,
  `grade_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `grade_name` text NOT NULL,
  `min_percentage` int(11) NOT NULL DEFAULT 0,
  `max_percentage` int(11) NOT NULL DEFAULT 0,
  `grade_point` int(11) NOT NULL DEFAULT 0,
  `school_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`id`, `grade_uuid`, `grade_name`, `min_percentage`, `max_percentage`, `grade_point`, `school_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '3fd1aa09-69a5-4557-8f46-e70bc87dfe6a', 'A++', 96, 100, 10, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'f531c971-41aa-406d-b592-ea646beb306f', 'A+', 86, 95, 9, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, '61fd3062-39d7-4c1b-aaa0-df10ccde0cb8', 'A', 76, 85, 8, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, 'b58cca2f-d1d8-4c1f-9bf9-c9d6c652c3b0', 'B++', 66, 75, 7, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, 'ab8fe9e8-ffdf-4533-956e-8d38a715f670', 'B+', 56, 65, 6, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(6, 'd0589ed2-3eb8-4230-b2e6-027ee1099355', 'B', 46, 55, 5, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(7, '31db39f4-7662-4a98-ac4f-021a51a95827', 'C', 36, 45, 4, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(8, '05cba2a5-3647-4320-be50-1b9166fce85a', 'D', 0, 35, 0, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lesson_resources`
--

CREATE TABLE `lesson_resources` (
  `id` bigint(20) NOT NULL,
  `resource_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `lesson_id` bigint(20) NOT NULL,
  `title` varchar(250) NOT NULL,
  `file_url` varchar(1000) NOT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lesson_resources`
--

INSERT INTO `lesson_resources` (`id`, `resource_uuid`, `lesson_id`, `title`, `file_url`, `file_type`, `created_at`, `updated_at`) VALUES
(1, '31799498-ce34-4e1f-8b3c-3730ed8e4fd4', 1, ' Python Full Course| Variables & Data Types | Lecture 1', ' Python Full Course| Variables & Data Types | Lecture 1', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(2, '019e49e3-3279-463f-a869-0c8520a7efdd', 2, ' Lecture 2 : Strings & Conditional Statements | Python Full Course', 'https://www.youtube.com/watch?v=lIId8IDP6TU&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=2', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(3, '8688d65c-9a60-4790-a9fa-67afa0bf01b7', 3, 'Lecture 3 : List & Tuple in Python | Python Full Course', 'https://www.youtube.com/watch?v=qVyvmzFxF_o&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=3', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(4, '67c7ec62-af96-4144-a32c-6385d6055b27', 4, 'Lecture 4 : Dictionary & Set in Python | Python Full Course', 'https://www.youtube.com/watch?v=078tYSD7K8E&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=4', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(5, '6d9f7652-9112-41b5-9e6f-68bf351c4414', 5, 'Lecture 5 : Loops in Python | While & For Loops | Python Full Course', 'https://www.youtube.com/watch?v=S73thl0AyFU&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=5', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(6, '2016c9a5-598d-4dce-bd04-5dd8f92a8bbf', 6, 'Lecture 6 : Functions & Recursion in Python | Python Full Course', 'https://www.youtube.com/watch?v=OvTH-7ESoRA&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=6', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(7, 'af629289-e031-4e0f-a3e6-3f96458a6cda', 7, 'Lecture 7 : File Input/Output in Python', 'https://www.youtube.com/watch?v=jU0cndZziO0&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=7', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(8, 'bd2d895d-1fdd-4ebc-8c45-b2dae8d76e08', 8, 'Lecture 8 : OOPS in Python | Object Oriented Programming | Classes & Objects | Python Full Course', 'https://www.youtube.com/watch?v=HeW-D6KpDwY&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=8', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(9, '65a1edc8-9cc6-433b-b512-8cc691698023', 9, 'Lecture 9 : OOPS Part 2 | Object Oriented Programming | Python Full Course', 'https://www.youtube.com/watch?v=bAwmZVJeO5s&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&index=9', 'url', '2025-12-23 12:28:30', '2025-12-23 12:28:30'),
(10, '77da5d0f-95b1-454b-8d2b-d45e721035d0', 10, 'Java Full Course', 'https://www.youtube.com/watch?v=xTtL8E4LzTQ', 'url', '2025-12-23 12:33:29', '2025-12-23 12:33:29'),
(11, '09f14ea4-662a-476b-b6eb-ff807d5ac99b', 11, 'HTML & CSS Full Course', 'https://www.youtube.com/watch?v=HGTJBPNC-Gw', 'url', '2025-12-23 12:36:44', '2025-12-23 12:36:44'),
(12, 'd43df7dd-f2c7-45f5-a674-53ced66343c1', 12, 'Listening Conversations English Speaking Practice | Listen And Speak', 'https://www.youtube.com/watch?v=IriEsf0v7HY&t=11s', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(13, 'bbc12068-c552-4126-8d9d-e7273118a4de', 13, 'Short Stories for Learning English | Past Continuous Story Listen & Speak', 'https://www.youtube.com/watch?v=QJ2x20GmUTs&t=8s', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(14, '0d8a86c8-24af-41bd-aa64-8ad2e80d1ccd', 14, 'English Listening and Speaking Practice | Past Simple Story', 'https://www.youtube.com/watch?v=O1iknZF-sk0', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(15, '81ef4d04-371c-4ee3-85ac-c9171456f253', 15, 'Improve Your English Speaking Skills By Listening To Short Stories', 'https://www.youtube.com/watch?v=_slOjIaewmQ', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(16, '7d0fe35f-e700-4a6a-aef9-f95ee9751aac', 16, 'Listen and Speak English Story For Simple Present Tense', 'https://www.youtube.com/watch?v=FqmiLz29f9E', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(17, '05b27400-aa53-4e0d-9f84-c491bb169ed5', 17, 'Learning English Speaking By Listening Conversation | Comparative & Superlative', 'https://www.youtube.com/watch?v=sFG0vk93m_A', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(18, 'e67f20c2-b055-47f2-b83d-875498409aa1', 18, 'English Listening Story To Practice Speaking Daily Conversation in English', 'https://www.youtube.com/watch?v=KnkqmIKrw48', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(19, '1fd94726-99af-4c50-9e8d-dd0c3f8d55a2', 19, 'Learn English Through Stories The Neighborhood Picnic | Listen and Speak English', 'https://www.youtube.com/watch?v=KQcTBjIs30c', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(20, '6a68d6c9-fda3-48c0-be3f-89de426c7029', 20, 'Talking About Daily Routines in English Conversations | Learn English Vocabulary', 'https://www.youtube.com/watch?v=CogzJS0byzQ', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(21, '4da24fd8-ce56-456b-baf8-535e2302c8d8', 21, 'Effortless English Course To Learn English Speaking', 'https://www.youtube.com/watch?v=6qvXqlVK3LE', 'url', '2025-12-23 12:51:10', '2025-12-23 12:51:10'),
(27, '477d453f-304d-4d5b-a8b3-5b73319ce047', 27, 'Daily English Conversation Practice | Improve Your English Listening Comprehension', 'https://www.youtube.com/watch?v=G7KWlYjJb08', 'url', '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(28, '3111f162-c121-448f-b684-ec83a6ee9bd8', 28, 'Listening English Conversation Practice | Learn English Holidays', 'https://www.youtube.com/watch?v=uEMNi9POWrg', 'url', '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(29, '9e4c3dd1-7ca4-43f8-bd03-0890ab574592', 29, 'English Conversation Practice | Daily Use English Sentences', 'https://www.youtube.com/watch?v=dBVIlxbyBLk', 'url', '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(30, 'fabb1603-e4e8-4fd0-93a5-d696d5877db4', 30, 'English Pronunciation Practice Listening Daily Conversation | Improve English Today', 'https://www.youtube.com/watch?v=YlCjfQkS1_c', 'url', '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(31, 'c3253aa7-428e-489e-a189-3c27077fc767', 31, 'Real Life English Conversation Practice | Real English Phrasal Verbs', 'https://www.youtube.com/watch?v=B9unhl4ciIM', 'url', '2025-12-23 13:06:08', '2025-12-23 13:06:08'),
(32, 'fe121187-2484-42bc-a347-44d61ded0bc2', 32, 'Learning English Fairy Tales | Stories For Listening And Speaking Practice', 'https://www.youtube.com/watch?v=yv77OZ_og-o', 'url', '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(33, '50e03542-64c1-4fe3-b07d-837358621b98', 33, 'English Stories Course To Practice Listening and Speaking', 'https://www.youtube.com/watch?v=F1mHUvrEpvQ', 'url', '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(34, '09924df2-b42c-4c2c-bc40-8d1b8d178f89', 34, 'Everyday English Conversation Practice | 30 Minutes English Listening', 'https://www.youtube.com/watch?v=henIVlCPVIY', 'url', '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(35, 'ce22eef6-2062-4769-90b5-da8d4c359f6f', 35, 'Job interview Questions And Answers | Business English Conversation Practice', 'https://www.youtube.com/watch?v=Fr2puMHT7nQ', 'url', '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(36, '32e66428-d2ff-48ca-a37b-ed09fbd06ac3', 36, 'Daily English Conversation Practice | Improve Your English Listening Comprehension', 'https://www.youtube.com/watch?v=G7KWlYjJb08', 'url', '2025-12-24 11:23:16', '2025-12-24 11:23:16'),
(37, '5df64a67-3770-46ba-8fd1-3b75d1201f1d', 37, 'Master the French Alphabet in Minutes', 'https://www.youtube.com/watch?v=-JhOFyw2WlI&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3', 'url', '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(38, '73dea3a7-7991-4794-8d2e-8af56fed9653', 38, 'How to Pronounce Words in French | Lesson 2', 'https://www.youtube.com/watch?v=tG2ae8mZmic&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3&index=4', 'url', '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(39, '948edd1c-996e-4201-a675-0a9db8ff2d36', 39, 'How to Use Articles in French | The Language Tutor *Lesson 6*', 'https://www.youtube.com/watch?v=RO4d-3Pmg3k&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3&index=7', 'url', '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(40, 'df785c17-80e9-4231-ae96-871271727cf5', 40, 'How to Count in French | Lesson 7', 'https://www.youtube.com/watch?v=DGCB0ySwfok&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3&index=2', 'url', '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(41, '114d1fd5-e836-4c31-ada5-0ca199c0396f', 41, 'Using C\'est in French | The Language Tutor *Lesson 8*', 'https://www.youtube.com/watch?v=JIEcdhvb5BQ&list=PLhPqxcTpoRSNYyuovAVKTHX8f3UGHBCi3&index=8', 'url', '2025-12-24 12:40:48', '2025-12-24 12:40:48'),
(42, '298ef066-5e7c-4146-b419-ad1de8c1f683', 42, 'A1 - Lesson 1 | Begrüßungen | Greetings | German for beginners | Learn German', 'https://www.youtube.com/watch?v=RuGmc662HDg&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW', 'url', '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(43, 'f0648861-1cd5-4fd2-8c09-d1643a122b22', 43, 'A1 - Lesson 2 | Common Phrases | German for beginners | Learn German', 'https://www.youtube.com/watch?v=S8ukFF6SdGk&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW&index=2', 'url', '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(44, '1c3a0ebb-db45-4cb2-ae01-562286dc7ef8', 44, 'A1 - Lesson 3 | Numbers 0-20 | Zahlen | German for beginners | Learn German', 'https://www.youtube.com/watch?v=d54ioeKA-jc&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW&index=3', 'url', '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(45, '658a64c7-307f-4cdf-ba0f-547934d189b0', 45, 'A1 - Lesson 4 | Numbers 21-100 | Zahlen | German for beginners | Learn German', 'https://www.youtube.com/watch?v=IaerX0Y6wmE&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW&index=4', 'url', '2025-12-24 12:49:52', '2025-12-24 12:49:52'),
(46, '0b85147a-1d7f-4f62-bfb1-0de82f7b814c', 46, 'A1 - Lesson 5 | Alphabets | das Alphabet | German for beginners | Learn German', 'https://www.youtube.com/watch?v=HCytWm3RC9g&list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW&index=5', 'url', '2025-12-24 12:49:52', '2025-12-24 12:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`name`) VALUES
('20230711044653-create_countries.js'),
('20230711044654-create-states.js'),
('20230711044655-create_cities.js'),
('20230711044656-created-gender-table.js'),
('20230711044657-created-accademic-year-table.js'),
('20230711070728-countries.js'),
('20230711073601-states.js'),
('20230810080739-cities.js'),
('20250924093713-schools.js'),
('20250924093714-roles.js'),
('20250924093715-users.js'),
('20250924093716-posts.js'),
('20250924093718-caste_categories.js'),
('20250924093738-roles.js'),
('20250924101708-teachers.js'),
('20250924124131-users.js'),
('20250925050646-otp.js'),
('20250929070959-user_login.js'),
('20250929093141-permissions.js'),
('20250929093154-role_permissions.js'),
('20250929093627-permissions.js'),
('20250929095824-users_permissions.js'),
('20251001112450-role_permission.js'),
('20251006063031-posts.js'),
('20251006063411-qualifications.js'),
('20251006063442-qualifications.js'),
('20251006063712-caste-categories.js'),
('20251006063857-teacher_qualification.js'),
('20251007090341-created-subject-table.js'),
('20251007090351-created-class-table.js'),
('20251007092523-created-stream-table.js'),
('20251007100821-created-class-section-table.js'),
('20251007100825-created-school-subject-map-table.js'),
('20251007112246-created-syllabus-table.js'),
('20251007112249-students.js'),
('20251007112250-created-teacher-class-map-table.js'),
('20251007112252-created-student-class-section-history-table.js'),
('20251008104313-insert-for-gender-table.js'),
('20251008111746-insert-for-accademic-year-table.js'),
('20251008121018-insert-statement-for-subject-table.js'),
('20251009104621-permission-for-stream-class-section-and-default-for-super-admin-insert.js'),
('20251010073051-created-teacher-subject-map-table.js'),
('20251010084930-made-subject-name-and-code-nullable-in-school-subject-table.js'),
('20251010092636-school-subject-permissions-insert.js'),
('20251010093009-school-subject-and-stream-and-class-permissions-insert-for-super-admin.js'),
('20251011055120-craeted-syllabus-resource-type-table.js'),
('20251011055125-added-craeted-by-in-syllabus-table.js'),
('20251011055127-craeted-chapters-table.js'),
('20251011060258-created-syllabus-chapter-table.js'),
('20251011060317-created-syllabus-chapter-resources-table.js'),
('20251011072747-insert-for-syllabus-resource-type.js'),
('20251011073120-insert-for-chapter-table.js'),
('20251011073121-insert-for-syllabus-permission-table.js'),
('20251012133632-created-assessment-type-table.js'),
('20251012134415-default-inserts-for-assesment-type.js'),
('20251012135853-created-assessment-table.js'),
('20251012141945-created-assessment-question-type-table.js'),
('20251012142749-created-assessment-question-table.js'),
('20251012142751-created-assessment-question-option-table.js'),
('20251012150524-created-student-assessment-result-table.js'),
('20251012152625-created-assessment-student-answer-table.js'),
('20251012153626-insert-for-assessment-permission-and-for-super-admin-rigts.js'),
('20251013092819-add-approved-status-column-in-syllabus-chapter-resource-table.js'),
('20251013095631-created-seeder-for-assessment-question-type.js'),
('20251015092253-created-seeder-for-default-admin-role-permissions.js'),
('20251015110116-created-grade-table.js'),
('20251015110718-created-grade-insert.js'),
('20251015111753-added-grade-id-in-student-assessment-result-table.js'),
('20251016062940-created-seed-for-adding-chapter-for-super-admin-permission.js'),
('20251016112435-permission-and-insert-for-admin-and-superadmin-for-subject-wise-report-module.js'),
('20251016122932-added-academic-year-id-in-assessment-table.js'),
('20251017064211-seed-permission-for-reports-for-admin-and-super-admin.js'),
('20251021090508-added-passing-marks-in-assessment-table.js'),
('20251027065426-categories.js'),
('20251027065427-difficulty_levels.js'),
('20251027065555-progress_statuses.js'),
('20251027065720-categories.js'),
('20251027065721-difficulty_levels.js'),
('20251027065732-progress_status.js'),
('20251027070110-skills.js'),
('20251027070219-user_skills.js'),
('20251027070724-create-new-table-notification-type.js'),
('20251027070725-create-new-table-notification.js'),
('20251027070726-create-new-table-notification-user-map.js'),
('20251027074912-insert-in-notification-type.js'),
('20251027082131-insert-in-roles-permissions-for-notifications.js'),
('20251027121415-add-new-column-class-id-and-alter-column-class-section-uuid-in-notifications-table.js'),
('20251028072535-create-table-notification-target-type.js'),
('20251028084431-add-column-notification-target-type-id-in-notifications-table.js'),
('20251029082847-create-sub-categories.js'),
('20251029082955-sub-categories.js'),
('20251029085542-create-course-structure-types-table.js'),
('20251029085543-courses-type.js'),
('20251029085544-courses.js'),
('20251029090159-added-course-id-in-assessment-table.js'),
('20251029103024-course-modules-table.js'),
('20251029103120-course-lessons-table.js'),
('20251029103407-lesson-resources-table.js'),
('20251029103715-course-structure-types-seeder.js'),
('20251029103716-course_types.js'),
('20251031064906-create-new-table-teacher-content-report.js'),
('20251031071351-seed-permission-for-teacher-content-report-in-permissions-table.js'),
('20251031091838-alter-column-notification-type-in-notifications-table.js'),
('20251104123611-course-additional-documents.js'),
('20251104123653-course-video-links.js'),
('20251107062619-make-assessment-table-columns-nullable.js'),
('20251107084009-insert-for-course-assessment-in-assessment-type.js'),
('20251107084508-added-is-course-assessment-in-assessment-type-table.js'),
('20251107103025-created-user_course_enrollments-table.js'),
('20251107113853-course-module-permisson-and-added-for-super-admin.js'),
('20251110060441-insert-statement-for-course-report-module-for-superadmin-and-admin.js'),
('20251110063126-added-started-at-date-in-user-course-enrollment-table.js'),
('20251113074248-added-total-questions-in-student-assessment-result-table.js'),
('20251113113147-added-percentage-columns-in-student-assessment-result-table.js'),
('20251118051233-crated-seeder-for-notification-target-type.js'),
('20251119110912-remove-unique-from-roll-number.js.js'),
('20251120125017-add-url-to-skills-table.js.js'),
('20251124111718-create-activity-logs.js'),
('20251128055742-create-table-assessment_class_section_link.js'),
('20251201123429-creted-school-subject-straeam-link-table.js'),
('20251204114524-added_column_in_assesment.js'),
('20251209052010-course_class_section_link.js'),
('20251211084602-destroy_classSectionId_course_table.js'),
('20251217122952-contact-us.js'),
('20251222085548-add-seed-in-category.js'),
('20251222085555-add-seed-in-sub-category.js'),
('20251223120000-change-specific-columns-to-utf8mb4.js');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `notifications_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `notification_type` bigint(20) DEFAULT NULL,
  `notification_title` varchar(255) NOT NULL,
  `notification_message` text NOT NULL,
  `school_id` bigint(20) NOT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `class_section_id` bigint(20) DEFAULT NULL,
  `notification_target_type_id` bigint(20) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_target_type`
--

CREATE TABLE `notification_target_type` (
  `id` bigint(20) NOT NULL,
  `notification_target_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `target_type` varchar(100) NOT NULL,
  `target_description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notification_target_type`
--

INSERT INTO `notification_target_type` (`id`, `notification_target_type_uuid`, `target_type`, `target_description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1478356f-6403-4f69-9e9a-5434ffd57d3e', 'whole_school', 'Whole school', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, 'f1cda4ed-b13f-4e40-bea1-928eb9ea2cef', 'all_teachers', 'All teachers', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(3, '40a74854-723f-4d57-ae1a-18a745ec3dd6', 'teachers_by_class', 'Teachers by class', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(4, '69c0864c-3a79-49d5-bbab-8c9aaa755b69', 'teachers_by_class_section', 'Teachers by class section', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(5, '532e2be1-f4a2-412e-a59e-832e108b2ed9', 'all_students', 'All students', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(6, '5225c1b4-2be3-4014-80cb-ff552338f753', 'students_by_class', 'Students by class', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(7, '6133eb86-5d84-4761-932a-33f8992ca094', 'students_by_class_section', 'Students by class section', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(8, 'b06069ee-e326-4d1a-8715-49d78f4273b4', 'teacher', 'Teacher', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(9, 'bdabfefa-84e8-4bdb-86ee-fcd50379e92e', 'student', 'Student', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification_type`
--

CREATE TABLE `notification_type` (
  `id` bigint(20) NOT NULL,
  `notification_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `notification_type` varchar(100) NOT NULL,
  `notification_description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notification_type`
--

INSERT INTO `notification_type` (`id`, `notification_type_uuid`, `notification_type`, `notification_description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1e269470-b3af-48eb-a7ab-b5e831519e8e', 'COURSE_ENROLLED', 'User enrolled in a course', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, 'e5006d28-aee3-44a6-9913-cbcc187e9d17', 'COURSE_COMPLETED', 'User completed a course', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(3, '18ed21a8-766c-42bd-af62-898b5de26ca0', 'NEW_COURSE_PUBLISHED', 'A new course has been published', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(4, '3914daa2-f955-4c4b-803e-6644faa63c21', 'ASSIGNMENT_ASSIGNED', 'A new assignment has been assigned', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(5, 'd7f5cb2d-30c5-4e3f-a21e-b743458d1d19', 'ASSIGNMENT_DUE_SOON', 'Assignment due date is approaching', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(6, 'b204082d-f657-467f-a0f8-ce5b32edb935', 'ASSIGNMENT_GRADED', 'Assignment has been graded', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(7, '4a0643be-a6cb-464b-ae49-30096d45b08b', 'QUIZ_AVAILABLE', 'A new quiz is available', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(8, '6a8ccb97-c6bd-42ae-ab7e-cdef49c66ba9', 'QUIZ_RESULT_PUBLISHED', 'Quiz results have been published', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(9, 'dc48e6ed-3fcd-4d03-a07a-0d8f0f659a30', 'EXAM_SCHEDULED', 'An exam has been scheduled', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(10, '545f8528-5498-49a0-bb09-751959a41e5c', 'EXAM_RESULT_PUBLISHED', 'Exam results have been published', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(11, 'e565cbbc-52a2-46b4-b727-95b0c5164347', 'CERTIFICATE_AWARDED', 'A certificate has been awarded', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(12, 'f4896de3-f703-4cb5-9e67-577fc5618249', 'NEW_MESSAGE', 'You have received a new message', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(13, 'c00e66ce-f6e3-4431-9ee4-a879fda25776', 'NEW_COMMENT', 'A new comment was posted', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(14, '83c63867-ff61-4083-bc3a-8a94f7da6839', 'MENTION', 'You were mentioned in a post or comment', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(15, '91fde601-636c-48c0-858b-ff088695e3df', 'FORUM_REPLY', 'Someone replied to your forum post', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(16, 'aefa0cb4-0962-4aaa-9966-a0d8d3b5ee28', 'ANNOUNCEMENT', 'A new announcement has been made', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(17, '0f4de189-9ceb-4219-97c3-4fd984df7e2c', 'SYSTEM_MAINTENANCE', 'System maintenance notification', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(18, '2e7a2f52-a8f9-46c3-b45d-371f57f95c34', 'PAYMENT_SUCCESS', 'Payment was successful', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(19, '5a103bfb-0618-42b7-a8eb-7b8094548b61', 'PAYMENT_FAILED', 'Payment failed', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(20, '99507f82-bfef-4c84-868d-b226256c3a1e', 'SUBSCRIPTION_EXPIRING', 'Your subscription is about to expire', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(21, '9b27f527-6631-4ea2-b58c-b190e91ef8e2', 'SUBSCRIPTION_RENEWED', 'Your subscription has been renewed', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(22, '0a8dc065-6b49-489c-b02f-2a8975df1378', 'NEW_ENROLLMENT', 'A new enrollment has occurred', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(23, 'e4d3499a-f077-4fe0-bc50-a334ba81bf56', 'ASSIGNMENT_SUBMITTED', 'Assignment has been submitted', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(24, '5a549dfa-0de0-4491-b023-eb3a3a07ce92', 'COURSE_REVIEW_RECEIVED', 'A new course review was received', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(25, '5d62a031-83a0-40c6-aae0-5640dcd95520', 'BADGE_EARNED', 'A badge has been earned', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(26, 'bee605c7-d18f-4457-9368-87c4fe508b09', 'PROFILE_UPDATED', 'Profile information was updated', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(27, '3ea0a3af-4e57-4818-a239-1bce342975c5', 'PASSWORD_CHANGED', 'Password was changed', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(28, '6802b9ef-abe2-43a0-9786-31b22e80ece7', 'LOGIN_ALERT', 'A new login was detected', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification_user_map`
--

CREATE TABLE `notification_user_map` (
  `id` bigint(20) NOT NULL,
  `notification_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `otp` bigint(20) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `user_id`, `otp`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 2, 4366, '2025-12-23 10:18:49', '2025-12-23 10:13:49', '2025-12-23 10:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'create_school', 'Create new school', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(2, 'read_school', 'View school details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(3, 'update_school', 'Update school details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(4, 'delete_school', 'Delete school', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(5, 'create_teacher', 'Create new teacher accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(6, 'read_teacher', 'View teacher details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(7, 'update_teacher', 'Update teacher details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(8, 'delete_teacher', 'Delete teacher accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(9, 'create_student', 'Create new student accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(10, 'read_student', 'View student details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(11, 'update_student', 'Update student details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(12, 'delete_student', 'Delete student accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(13, 'create_course', 'Create new courses', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(14, 'read_course', 'View course details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(15, 'update_course', 'Update existing courses', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(16, 'delete_course', 'Delete courses', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(17, 'create_assignment', 'Create assignments/tests', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(18, 'read_assignment', 'View assignments/tests', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(19, 'update_assignment', 'Update assignments/tests', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(20, 'delete_assignment', 'Delete assignments/tests', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(21, 'grade_assignment', 'Grade student submissions', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(22, 'submit_assignment', 'Submit assignment (student)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(23, 'create_announcement', 'Post school announcements', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(24, 'read_announcement', 'View announcements', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(25, 'update_announcement', 'Edit announcements', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(26, 'delete_announcement', 'Delete announcements', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(27, 'upload_material', 'Upload study materials (PDF, video, etc.)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(28, 'read_material', 'Access/download materials', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(29, 'update_material', 'Update materials', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(30, 'delete_material', 'Delete materials', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(31, 'read_report', 'View progress and analytics', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(32, 'generate_video_class_link', 'Generate video class links', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(33, 'join_video_class', 'Join video classes', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(34, 'create_user', 'Create generic user accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(35, 'read_user', 'View user accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(36, 'update_user', 'Update user accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(37, 'delete_user', 'Delete user accounts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(38, 'manage_roles', 'Assign roles and permissions', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(39, 'create_stream', 'Create new stream', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(40, 'read_stream', 'View stream details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(41, 'update_stream', 'Update stream details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(42, 'delete_stream', 'Delete stream', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(43, 'create_class', 'Create new class', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(44, 'read_class', 'View class details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(45, 'update_class', 'Update class details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(46, 'delete_class', 'Delete class', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(47, 'create_school_subject', 'Create school subject', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(48, 'read_school_subject', 'View school subject list and details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(49, 'update_school_subject', 'Update school subject details', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(50, 'delete_school_subject', 'Delete school subject', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(51, 'create_syllabus', 'create syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(52, 'read_syllabus', 'read syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(53, 'update_syllabus', 'update syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(54, 'delete_syllabus', 'delete syllabus', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(55, 'create_assessment', 'create assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(56, 'read_assessment', 'read assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(57, 'update_assessment', 'update assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(58, 'delete_assessment', 'delete assessment', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(59, 'create_chapter', 'create chapter', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(60, 'read_chapter', 'read chapter', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(61, 'update_chapter', 'update chapter', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(62, 'delete_chapter', 'delete chapter', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(63, 'subject_wise_students_report', 'subject wise students report', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(64, 'student_wise_academic_progress_report', 'student wise academic progress report', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(65, 'user_wise_content_uploaded_report', 'user wise content uploaded report', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(66, 'class_wise_student_report', 'class wise student report', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(67, 'create_notification', 'create notification', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(68, 'read_notification', 'read notification', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(69, 'update_notification', 'update notification', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(70, 'delete_notification', 'delete notification', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(71, 'teacher_content_report', 'teacher content report', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(72, 'read_course', 'read course', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(73, 'create_course', 'create course', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(74, 'update_course', 'update course', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(75, 'delete_course', 'delete course', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(76, 'enroll_course', 'enroll course', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(77, 'course_report', 'course report', '2025-12-22 13:06:50', '2025-12-22 13:06:50');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Principal', 'Oversees overall administration, leadership, and performance of the school.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(2, 'Vice Principal', 'Assists the principal with school management and coordination of academics.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(3, 'PGT (Post Graduate Teacher)', 'Teaches senior secondary classes (11th & 12th) in specialized subjects.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(4, 'TGT (Trained Graduate Teacher)', 'Teaches middle and secondary classes (6th to 10th) in various subjects.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(5, 'PRT (Primary Teacher)', 'Teaches foundational subjects to students from classes 1 to 5.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(6, 'PET (Physical Education Teacher)', 'Conducts physical training, sports, and health education activities.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(7, 'Counselor', 'Supports students’ emotional, academic, and social well-being.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(8, 'Music Teacher', 'Teaches instrumental and vocal music and conducts school music programs.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(9, 'Art Teacher', 'Instructs students in visual arts, drawing, painting, and craftwork.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(10, 'Computer Teacher', 'Teaches computer science, IT fundamentals, and digital literacy.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(11, 'Librarian', 'Maintains library resources, manages book circulation, and assists students.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(12, 'Lab Assistant', 'Assists teachers and students during science practicals and maintains lab inventory.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(13, 'Accountant', 'Handles financial transactions, school fees, and accounting records.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(14, 'Office Assistant', 'Supports administrative tasks, record keeping, and documentation.', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(15, 'Receptionist', 'Greets visitors, answers calls, and manages school front office operations.', '2025-12-22 13:06:49', '2025-12-22 13:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `progress_status`
--

CREATE TABLE `progress_status` (
  `id` bigint(20) NOT NULL,
  `status_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `progress_status`
--

INSERT INTO `progress_status` (`id`, `status_uuid`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'c1a69d0a-5489-4c65-8c0e-2da1ea4e071a', 'Not Started', 'User has not started learning yet.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(2, '30c44d76-ede9-4a9e-b3f6-23f7c29c52d0', 'In Progress', 'User has started learning but not completed.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL),
(3, '5e52126a-706b-43d4-9af9-5286a6cbe921', 'Completed', 'User has completed.', '2025-12-22 13:06:50', '2025-12-22 13:06:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `qualifications`
--

INSERT INTO `qualifications` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'B.Ed', 'Qualification: B.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(2, 'M.Ed', 'Qualification: M.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(3, 'D.El.Ed', 'Qualification: D.El.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(4, 'B.El.Ed', 'Qualification: B.El.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(5, 'TTC (Teacher Training Certificate)', 'Qualification: TTC (Teacher Training Certificate)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(6, 'D.Ed (Diploma in Education)', 'Qualification: D.Ed (Diploma in Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(7, 'Ph.D', 'Qualification: Ph.D', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(8, 'M.Phil', 'Qualification: M.Phil', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(9, 'NET (Education)', 'Qualification: NET (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(10, 'SET (Education)', 'Qualification: SET (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(11, 'B.Com', 'Qualification: B.Com', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(12, 'M.Com', 'Qualification: M.Com', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(13, 'MBA', 'Qualification: MBA', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(14, 'BBA', 'Qualification: BBA', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(15, 'PGDBM', 'Qualification: PGDBM', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(16, 'PGDM', 'Qualification: PGDM', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(17, 'B.Sc (Physics)', 'Qualification: B.Sc (Physics)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(18, 'B.Sc (Chemistry)', 'Qualification: B.Sc (Chemistry)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(19, 'B.Sc (Biology)', 'Qualification: B.Sc (Biology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(20, 'B.Sc (Maths)', 'Qualification: B.Sc (Maths)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(21, 'M.Sc (Physics)', 'Qualification: M.Sc (Physics)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(22, 'M.Sc (Chemistry)', 'Qualification: M.Sc (Chemistry)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(23, 'M.Sc (Biology)', 'Qualification: M.Sc (Biology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(24, 'M.Sc (Maths)', 'Qualification: M.Sc (Maths)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(25, 'M.Sc (Computer Science)', 'Qualification: M.Sc (Computer Science)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(26, 'B.Sc (Computer Science)', 'Qualification: B.Sc (Computer Science)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(27, 'BA (English)', 'Qualification: BA (English)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(28, 'BA (History)', 'Qualification: BA (History)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(29, 'BA (Geography)', 'Qualification: BA (Geography)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(30, 'BA (Political Science)', 'Qualification: BA (Political Science)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(31, 'BA (Sociology)', 'Qualification: BA (Sociology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(32, 'BA (Economics)', 'Qualification: BA (Economics)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(33, 'MA (English)', 'Qualification: MA (English)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(34, 'MA (History)', 'Qualification: MA (History)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(35, 'MA (Political Science)', 'Qualification: MA (Political Science)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(36, 'MA (Geography)', 'Qualification: MA (Geography)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(37, 'MA (Sociology)', 'Qualification: MA (Sociology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(38, 'MA (Economics)', 'Qualification: MA (Economics)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(39, 'MA (Education)', 'Qualification: MA (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(40, 'MA (Psychology)', 'Qualification: MA (Psychology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(41, 'BFA (Bachelor of Fine Arts)', 'Qualification: BFA (Bachelor of Fine Arts)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(42, 'MFA (Master of Fine Arts)', 'Qualification: MFA (Master of Fine Arts)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(43, 'BA (Music Hons)', 'Qualification: BA (Music Hons)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(44, 'MA (Music)', 'Qualification: MA (Music)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(45, 'B.P.Ed (Bachelor of Physical Education)', 'Qualification: B.P.Ed (Bachelor of Physical Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(46, 'M.P.Ed (Master of Physical Education)', 'Qualification: M.P.Ed (Master of Physical Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(47, 'BP.Ed', 'Qualification: BP.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(48, 'MP.Ed', 'Qualification: MP.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(49, 'Diploma in Music', 'Qualification: Diploma in Music', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(50, 'Diploma in Fine Arts', 'Qualification: Diploma in Fine Arts', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(51, 'B.Lib.Sc', 'Qualification: B.Lib.Sc', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(52, 'M.Lib.Sc', 'Qualification: M.Lib.Sc', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(53, 'BCA', 'Qualification: BCA', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(54, 'MCA', 'Qualification: MCA', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(55, 'PGDCA', 'Qualification: PGDCA', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(56, 'Diploma in Computer Applications', 'Qualification: Diploma in Computer Applications', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(57, 'BA (Hindi)', 'Qualification: BA (Hindi)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(58, 'MA (Hindi)', 'Qualification: MA (Hindi)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(59, 'BA (Sanskrit)', 'Qualification: BA (Sanskrit)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(60, 'MA (Sanskrit)', 'Qualification: MA (Sanskrit)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(61, 'BA (Urdu)', 'Qualification: BA (Urdu)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(62, 'MA (Urdu)', 'Qualification: MA (Urdu)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(63, 'B.Sc (Bio)', 'Qualification: B.Sc (Bio)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(64, 'B.Sc (Home Science)', 'Qualification: B.Sc (Home Science)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(65, 'B.A. (Education)', 'Qualification: B.A. (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(66, 'M.A. (Education)', 'Qualification: M.A. (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(67, 'M.A. (Psychology)', 'Qualification: M.A. (Psychology)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(68, 'M.A. (History) M.Ed NET (Edu.)', 'Qualification: M.A. (History) M.Ed NET (Edu.)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(69, 'M.A. (English) Ph.D (Education)', 'Qualification: M.A. (English) Ph.D (Education)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(70, 'M.A. (Political Science) B.Ed', 'Qualification: M.A. (Political Science) B.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(71, 'B.Sc (Bio) M.A. (History) M.Ed NET (Edu.)', 'Qualification: B.Sc (Bio) M.A. (History) M.Ed NET (Edu.)', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(72, 'M.Com B.Ed', 'Qualification: M.Com B.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(73, 'M.Com M.Ed', 'Qualification: M.Com M.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(74, 'M.Com BP.Ed', 'Qualification: M.Com BP.Ed', '2025-12-22 13:06:49', '2025-12-22 13:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `role_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_uuid`, `name`, `description`, `school_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'a3f8c4b2-7d5e-4a1c-9f42-12b67e8a5f11', 'superadmin', 'Full access to all modules and settings', NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'b7d9e1a4-3c6f-4e2a-8f91-45a2c7d4e822', 'admin', 'Manages school, teachers, and students', NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, 'c6e4d7a1-9b23-46f0-a82c-13d8c5f44e93', 'teacher', 'Manages classes, assignments, and students', NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, 'd4f7a9e2-6c12-4f9b-87d5-98f2a4b3c7f4', 'student', 'Access courses, submit assignments, and take tests', NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, 'e8a2f6c1-5b9d-40d3-91f7-21c6a8e3b4d9', 'parent', 'Monitor child\'s progress and activities', NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(2, 1, 2, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(3, 1, 3, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(4, 1, 4, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(5, 1, 5, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(6, 1, 6, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(7, 1, 7, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(8, 1, 8, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(9, 1, 9, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(10, 1, 10, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(11, 1, 11, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(12, 1, 12, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(13, 1, 13, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(14, 1, 14, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(15, 1, 15, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(16, 1, 16, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(17, 1, 17, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(18, 1, 18, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(19, 1, 19, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(20, 1, 20, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(21, 1, 21, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(22, 1, 22, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(23, 1, 23, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(24, 1, 24, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(25, 1, 25, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(26, 1, 26, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(27, 1, 27, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(28, 1, 28, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(29, 1, 29, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(30, 1, 30, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(31, 1, 31, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(32, 1, 32, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(33, 1, 33, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(34, 1, 34, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(35, 1, 35, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(36, 1, 36, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(37, 1, 37, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(38, 1, 38, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(39, 1, 39, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(40, 1, 40, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(41, 1, 41, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(42, 1, 42, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(43, 1, 43, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(44, 1, 44, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(45, 1, 45, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(46, 1, 46, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(47, 1, 47, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(48, 1, 48, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(49, 1, 49, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(50, 1, 50, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(51, 1, 51, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(52, 1, 52, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(53, 1, 53, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(54, 1, 54, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(55, 1, 55, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(56, 1, 56, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(57, 1, 57, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(58, 1, 58, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(59, 2, 5, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(60, 2, 6, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(61, 2, 7, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(62, 2, 8, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(63, 2, 9, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(64, 2, 10, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(65, 2, 11, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(66, 2, 12, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(67, 2, 13, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(68, 2, 14, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(69, 2, 15, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(70, 2, 16, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(71, 2, 17, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(72, 2, 18, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(73, 2, 19, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(74, 2, 20, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(75, 2, 21, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(76, 2, 22, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(77, 2, 23, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(78, 2, 24, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(79, 2, 25, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(80, 2, 26, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(81, 2, 27, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(82, 2, 28, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(83, 2, 29, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(84, 2, 30, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(85, 2, 31, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(86, 2, 32, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(87, 2, 33, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(88, 2, 34, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(89, 2, 35, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(90, 2, 36, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(91, 2, 37, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(92, 2, 38, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(93, 2, 39, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(94, 2, 40, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(95, 2, 41, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(96, 2, 42, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(97, 2, 43, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(98, 2, 44, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(99, 2, 45, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(100, 2, 46, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(101, 2, 47, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(102, 2, 48, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(103, 2, 49, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(104, 2, 50, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(105, 2, 51, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(106, 2, 52, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(107, 2, 53, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(108, 2, 54, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(109, 2, 55, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(110, 2, 56, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(111, 2, 57, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(112, 2, 58, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(113, 1, 59, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(114, 1, 60, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(115, 1, 61, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(116, 1, 62, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(117, 1, 63, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(118, 2, 63, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(119, 1, 64, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(120, 1, 65, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(121, 1, 66, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(122, 2, 64, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(123, 2, 65, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(124, 2, 66, '2025-12-22 13:06:49', '2025-12-22 13:06:49'),
(125, 1, 67, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(126, 1, 68, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(127, 1, 69, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(128, 1, 70, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(129, 2, 67, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(130, 2, 68, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(131, 2, 69, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(132, 2, 70, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(133, 3, 67, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(134, 3, 68, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(135, 3, 69, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(136, 3, 70, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(137, 1, 71, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(138, 2, 71, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(139, 1, 13, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(140, 1, 14, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(141, 1, 15, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(142, 1, 16, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(143, 1, 72, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(144, 1, 73, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(145, 1, 74, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(146, 1, 75, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(147, 1, 76, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(148, 2, 13, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(149, 2, 14, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(150, 2, 15, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(151, 2, 16, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(152, 2, 72, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(153, 2, 73, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(154, 2, 74, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(155, 2, 75, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(156, 2, 76, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(157, 1, 77, '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(158, 2, 77, '2025-12-22 13:06:50', '2025-12-22 13:06:50');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` bigint(20) NOT NULL,
  `school_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text NOT NULL,
  `country_id` int(11) NOT NULL DEFAULT 1,
  `state_id` int(11) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `school_uuid`, `name`, `code`, `email`, `phone`, `address`, `country_id`, `state_id`, `city_id`, `city_name`, `pin_code`, `website`, `logo_url`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1ef58592-b514-4f70-be40-9977a80d1fb2', 'Ganga International School', 'GAN001', 'ankit.bhatnagar@glocalview.com', '8448222971', 'Hiran Kudna, Rohtak Road, New Delhi - 110041', 1, 10, 128, NULL, '110041', 'https://www.gangainternationalschool.com/', 'public/profile_images/logo_url_1766465029236.png', 1, '2025-12-23 10:13:49', '2025-12-23 10:13:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_subject`
--

CREATE TABLE `school_subject` (
  `id` bigint(20) NOT NULL,
  `school_subject_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `subject_name` varchar(150) DEFAULT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `school_id` bigint(20) NOT NULL,
  `subject_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `stream_id` bigint(20) DEFAULT NULL,
  `max_marks` int(11) NOT NULL DEFAULT 0,
  `passing_marks` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `school_subject`
--

INSERT INTO `school_subject` (`id`, `school_subject_uuid`, `subject_name`, `subject_code`, `school_id`, `subject_id`, `class_id`, `stream_id`, `max_marks`, `passing_marks`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ee2bef3c-682f-4519-8086-efad0428bcf7', NULL, NULL, 1, 2, 1, NULL, 100, 33, '2025-12-23 10:19:28', '2025-12-23 10:19:28', NULL),
(2, 'c9fb63eb-6ed9-4ea3-8873-471c082a9ce9', NULL, NULL, 1, 4, 1, NULL, 100, 33, '2025-12-23 10:19:43', '2025-12-23 10:19:43', NULL),
(3, 'aeca64f4-a9e2-45fc-b983-69e8e1125652', NULL, NULL, 1, 5, 1, NULL, 100, 33, '2025-12-23 10:19:55', '2025-12-23 10:19:55', NULL),
(4, '9491cbc2-5468-4671-b431-9b46b2aa1118', NULL, NULL, 1, 1, 1, NULL, 100, 33, '2025-12-23 10:20:07', '2025-12-23 10:20:07', NULL),
(5, '58a7351f-d247-45ee-83bc-39cf8c5eb1ea', NULL, NULL, 1, 6, 1, NULL, 100, 33, '2025-12-23 10:20:22', '2025-12-23 10:20:22', NULL),
(6, '0f7af613-8079-4f1b-aac7-faf17d64268e', NULL, NULL, 1, 8, 1, NULL, 100, 33, '2025-12-23 10:20:35', '2025-12-23 10:20:35', NULL),
(7, 'ec3bcd92-01e4-4ab7-95c4-9447fc7f47ba', NULL, NULL, 1, 9, 1, NULL, 100, 33, '2025-12-23 10:20:50', '2025-12-23 10:20:50', NULL),
(8, '48977d04-a8ab-4872-b6fe-60699436492f', NULL, NULL, 1, 10, 1, NULL, 100, 33, '2025-12-23 10:21:04', '2025-12-23 10:21:04', NULL),
(9, 'bae7fa00-ed40-4add-a23b-fedfb7070cca', NULL, NULL, 1, 11, 1, NULL, 100, 33, '2025-12-23 10:21:19', '2025-12-23 10:21:19', NULL),
(10, 'cd044b80-3fb9-498a-87b7-965789b0d3ae', NULL, NULL, 1, 3, 1, NULL, 100, 33, '2025-12-23 10:21:30', '2025-12-23 10:21:30', NULL),
(11, 'e9aed53c-ed0e-4541-a945-c8a415cb1f2b', NULL, NULL, 1, 5, 2, NULL, 100, 33, '2025-12-23 10:21:44', '2025-12-23 10:21:44', NULL),
(12, 'ac1b2db5-75e8-4ddb-b57f-2c759b620c1a', NULL, NULL, 1, 4, 2, NULL, 100, 33, '2025-12-23 10:22:08', '2025-12-23 10:22:08', NULL),
(13, 'fb444618-8da3-4711-bc18-7854b48fa73c', NULL, NULL, 1, 8, 2, NULL, 100, 33, '2025-12-23 10:22:20', '2025-12-23 10:22:20', NULL),
(14, 'e6e42dbf-cf72-406a-8026-88e3d2952e7d', NULL, NULL, 1, 2, 2, NULL, 100, 33, '2025-12-23 10:22:41', '2025-12-23 10:22:41', NULL),
(15, '933da122-45da-414c-ac5f-32d2ce1af53a', NULL, NULL, 1, 6, 2, NULL, 100, 33, '2025-12-23 10:22:54', '2025-12-23 10:22:54', NULL),
(16, '6df597c5-10a6-4cf8-9fac-b7a2931a58d1', NULL, NULL, 1, 11, 2, NULL, 100, 33, '2025-12-23 10:23:38', '2025-12-23 10:23:38', NULL),
(17, 'ff014baa-ded5-49b4-8313-ec5632a5656a', NULL, NULL, 1, 3, 2, NULL, 100, 33, '2025-12-23 10:23:52', '2025-12-23 10:23:52', NULL),
(18, 'ade2db1c-6e87-44cd-bb31-3bcce8866e02', NULL, NULL, 1, 10, 2, NULL, 100, 33, '2025-12-23 10:24:04', '2025-12-23 10:24:04', NULL),
(19, '429102ff-2677-47a7-97b2-5c77f2d350d5', NULL, NULL, 1, 9, 2, NULL, 100, 33, '2025-12-23 10:24:29', '2025-12-23 10:24:29', NULL),
(20, '30acccfa-d8c7-48bf-9bb8-b6300048c447', NULL, NULL, 1, 1, 2, NULL, 100, 33, '2025-12-23 10:24:41', '2025-12-23 10:24:41', NULL),
(21, '350d074f-5836-4321-966e-5dc05e365ec2', NULL, NULL, 1, 4, 3, NULL, 100, 33, '2025-12-23 10:24:59', '2025-12-23 10:24:59', NULL),
(22, '41bb90b5-7ce7-424f-a287-17b134f3f496', NULL, NULL, 1, 8, 3, NULL, 100, 33, '2025-12-23 10:25:17', '2025-12-23 10:25:17', NULL),
(23, '072f62d2-e4cf-4193-8773-412ec4189ca4', NULL, NULL, 1, 2, 3, NULL, 100, 33, '2025-12-23 10:25:35', '2025-12-23 10:25:35', NULL),
(24, '4da75120-a7ff-43d4-8c4c-b273cd56f817', NULL, NULL, 1, 1, 3, NULL, 100, 33, '2025-12-23 10:25:48', '2025-12-23 10:25:48', NULL),
(25, '58f748d5-5a64-4e0a-a669-28368b14477d', NULL, NULL, 1, 6, 3, NULL, 100, 33, '2025-12-23 10:26:01', '2025-12-23 10:26:01', NULL),
(26, 'a5d5817a-9e25-4403-a12f-3f9d1c5d0d0c', NULL, NULL, 1, 5, 3, NULL, 100, 33, '2025-12-23 10:26:17', '2025-12-23 10:26:17', NULL),
(27, '9d3e06e0-91f9-4a4b-890c-4a8af191c1dd', NULL, NULL, 1, 11, 3, NULL, 100, 33, '2025-12-23 10:26:31', '2025-12-23 10:26:31', NULL),
(28, '5f0aad90-e69e-401f-906e-ba4718b0e53b', NULL, NULL, 1, 3, 3, NULL, 100, 33, '2025-12-23 10:26:45', '2025-12-23 10:26:45', NULL),
(29, 'f8e0477e-8198-4e3f-9518-f96abc8341ba', NULL, NULL, 1, 10, 3, NULL, 100, 33, '2025-12-23 10:26:57', '2025-12-23 10:26:57', NULL),
(30, 'f142a127-5685-4efd-b702-617019479598', NULL, NULL, 1, 9, 3, NULL, 100, 33, '2025-12-23 10:27:10', '2025-12-23 10:27:10', NULL),
(31, '776e8bee-2c55-4022-895f-d9785ffaeb17', NULL, NULL, 1, 1, 4, NULL, 100, 33, '2025-12-23 10:27:30', '2025-12-23 10:27:30', NULL),
(32, 'afdcd612-7664-45f9-bf77-d8b5d45b849a', NULL, NULL, 1, 2, 4, NULL, 100, 33, '2025-12-23 10:27:44', '2025-12-23 10:27:44', NULL),
(33, '28be4e8a-86cb-413c-ba60-45101779a98f', NULL, NULL, 1, 12, 4, NULL, 100, 33, '2025-12-23 10:27:55', '2025-12-23 10:27:55', NULL),
(34, '08292cfd-2fc0-4e50-9483-7856ca9655e8', NULL, NULL, 1, 3, 4, NULL, 100, 33, '2025-12-23 10:28:08', '2025-12-23 10:28:08', NULL),
(35, '245aa097-22d0-4c42-a576-ac97892b612b', NULL, NULL, 1, 6, 4, NULL, 100, 33, '2025-12-23 10:28:21', '2025-12-23 10:28:21', NULL),
(36, '50eff28b-c810-4e37-adf5-e367f83c8794', NULL, NULL, 1, 8, 4, NULL, 100, 33, '2025-12-23 10:28:36', '2025-12-23 10:28:36', NULL),
(37, '420d6404-544c-44b1-a9b9-bfcb9cb8457f', NULL, NULL, 1, 9, 4, NULL, 100, 33, '2025-12-23 10:28:49', '2025-12-23 10:28:49', NULL),
(38, '84876e77-46a3-47a5-a74e-039b377d53fb', NULL, NULL, 1, 10, 4, NULL, 100, 33, '2025-12-23 10:29:03', '2025-12-23 10:29:03', NULL),
(39, '8faac47b-14e8-4cbe-853a-d7e6e4ecb94c', NULL, NULL, 1, 4, 4, NULL, 100, 33, '2025-12-23 10:29:14', '2025-12-23 10:29:14', NULL),
(40, '2a6d9a22-3af2-4b79-9115-6d31acc9596e', NULL, NULL, 1, 1, 5, NULL, 100, 33, '2025-12-23 10:29:34', '2025-12-23 10:29:34', NULL),
(41, 'b4305218-a12e-4f79-98f1-7c133cc26d65', NULL, NULL, 1, 2, 5, NULL, 100, 33, '2025-12-23 10:29:46', '2025-12-23 10:29:46', NULL),
(42, '54d3d7c8-86fe-4d3a-bead-f289cf7dbee0', NULL, NULL, 1, 3, 5, NULL, 100, 33, '2025-12-23 10:29:58', '2025-12-23 10:29:58', NULL),
(43, 'd381a065-a11d-4f9e-8818-38a2b19fe0ff', NULL, NULL, 1, 6, 5, NULL, 100, 33, '2025-12-23 10:30:14', '2025-12-23 10:30:14', NULL),
(44, '0d223f93-8aaa-418c-867d-ac1cfb15a3d1', NULL, NULL, 1, 8, 5, NULL, 100, 33, '2025-12-23 10:30:27', '2025-12-23 10:30:27', NULL),
(45, '8d19a191-9be3-4c67-a9c8-075135a85f92', NULL, NULL, 1, 9, 5, NULL, 100, 33, '2025-12-23 10:30:43', '2025-12-23 10:30:43', NULL),
(46, 'da066af0-e9f6-4641-8d4c-6673a1157c31', NULL, NULL, 1, 10, 5, NULL, 100, 33, '2025-12-23 10:30:55', '2025-12-23 10:30:55', NULL),
(47, '0bb37e44-9050-45d1-92ed-998b0c465051', NULL, NULL, 1, 4, 5, NULL, 100, 33, '2025-12-23 10:31:07', '2025-12-23 10:31:07', NULL),
(48, '195832d4-84f1-4023-b999-ec58a7b1fcc4', NULL, NULL, 1, 13, 6, NULL, 100, 33, '2025-12-23 10:31:50', '2025-12-23 10:31:50', NULL),
(49, '28e84c89-8a04-461e-a7d5-63d41f88e69a', NULL, NULL, 1, 16, 6, NULL, 100, 33, '2025-12-23 10:32:12', '2025-12-23 10:32:12', NULL),
(50, 'dda64946-7cc0-4d87-8e96-91b78774ec88', NULL, NULL, 1, 14, 6, NULL, 100, 33, '2025-12-23 10:32:38', '2025-12-23 10:32:38', NULL),
(51, 'e81839b6-ca2c-41e1-b027-752dc8ab7205', NULL, NULL, 1, 15, 6, NULL, 100, 33, '2025-12-23 10:33:36', '2025-12-23 10:33:36', NULL),
(52, 'd690d973-8129-4b67-a641-71babcb367da', NULL, NULL, 1, 17, 6, NULL, 100, 33, '2025-12-23 10:33:59', '2025-12-23 10:33:59', NULL),
(53, '1415992a-bac6-4ec0-9b68-ae94ee7572aa', NULL, NULL, 1, 18, 6, NULL, 100, 33, '2025-12-23 10:34:23', '2025-12-23 10:34:23', NULL),
(54, '82d72c16-5170-4cf8-81eb-952f62d0a73c', NULL, NULL, 1, 19, 6, NULL, 100, 33, '2025-12-23 10:34:45', '2025-12-23 10:34:45', NULL),
(55, 'b17633ae-e2c4-4824-8bb4-9f14eada8e94', NULL, NULL, 1, 20, 6, NULL, 100, 33, '2025-12-23 10:35:02', '2025-12-23 10:35:02', NULL),
(56, '68025925-7839-432d-b9c6-145c30d31643', NULL, NULL, 1, 1, 6, NULL, 100, 33, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(57, '56b3aa5b-5047-4afa-be35-3b0999449db3', NULL, NULL, 1, 21, 6, NULL, 100, 33, '2025-12-23 10:35:44', '2025-12-23 10:35:44', NULL),
(58, 'abc51144-15ab-4334-a5fe-e11c2d542612', NULL, NULL, 1, 22, 6, NULL, 100, 33, '2025-12-23 10:36:01', '2025-12-23 10:36:01', NULL),
(59, 'f9c51911-70d0-463e-9e0b-47bac66ab568', NULL, NULL, 1, 2, 6, NULL, 100, 33, '2025-12-23 10:36:20', '2025-12-23 10:36:20', NULL),
(60, '47dae824-c40a-429e-b19f-cb253fd48826', NULL, NULL, 1, 23, 6, NULL, 100, 33, '2025-12-23 10:36:38', '2025-12-23 10:36:38', NULL),
(61, 'd3146156-1a3c-4ee0-bfd4-33e897d636de', NULL, NULL, 1, 24, 6, NULL, 100, 33, '2025-12-23 10:36:56', '2025-12-23 10:36:56', NULL),
(62, '6c328014-807a-46ee-a89b-97718232eaab', NULL, NULL, 1, 25, 6, NULL, 100, 33, '2025-12-23 10:37:15', '2025-12-23 10:37:15', NULL),
(63, '62473ab2-114e-4fd1-ac37-ae45360ed4a1', NULL, NULL, 1, 26, 6, NULL, 100, 33, '2025-12-23 10:37:33', '2025-12-23 10:37:33', NULL),
(64, '283b9d4c-df8b-4016-9c7c-8bbd1e686e21', NULL, NULL, 1, 3, 6, NULL, 100, 33, '2025-12-23 10:37:50', '2025-12-23 10:37:50', NULL),
(65, 'c5e36876-97d5-43e5-8192-ed2313e0b649', NULL, NULL, 1, 6, 6, NULL, 100, 33, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(66, 'c32e7179-8ad0-4434-ada4-f330f8be0b52', NULL, NULL, 1, 27, 6, NULL, 100, 33, '2025-12-23 10:38:35', '2025-12-23 10:38:35', NULL),
(67, '5bcbda8e-c5cd-4ec9-80e2-b8bd9149cf40', NULL, NULL, 1, 28, 6, NULL, 100, 33, '2025-12-23 10:38:54', '2025-12-23 10:38:54', NULL),
(68, '82a1b80f-9cb9-4ad5-8a65-968a87379834', NULL, NULL, 1, 29, 6, NULL, 100, 33, '2025-12-23 10:39:11', '2025-12-23 10:39:11', NULL),
(69, 'c1b669a1-d3a7-43d8-afc4-e7a303448bf8', NULL, NULL, 1, 30, 6, NULL, 100, 33, '2025-12-23 10:39:28', '2025-12-23 10:39:28', NULL),
(70, 'f2ce8917-e5f6-40ce-b083-4164cfac5e74', NULL, NULL, 1, 8, 6, NULL, 100, 33, '2025-12-23 10:39:59', '2025-12-23 10:39:59', NULL),
(71, 'd07fd6cd-f398-4183-a89f-d5168f2ae699', NULL, NULL, 1, 31, 6, NULL, 100, 33, '2025-12-23 10:40:20', '2025-12-23 10:40:20', NULL),
(72, '8837f4f6-02e3-45e6-b857-e02625ecde7b', NULL, NULL, 1, 4, 6, NULL, 100, 33, '2025-12-23 10:40:37', '2025-12-23 10:40:37', NULL),
(73, '96023efb-ba1b-469b-90e4-7d27ebd64234', NULL, NULL, 1, 13, 7, NULL, 100, 33, '2025-12-23 10:41:32', '2025-12-23 10:41:32', NULL),
(74, 'e7666705-08a2-429c-a2e9-8f5e7b102c13', NULL, NULL, 1, 14, 7, NULL, 100, 33, '2025-12-23 10:41:53', '2025-12-23 10:41:53', NULL),
(75, '36549990-c485-4b88-b43c-6d37156ba8c7', NULL, NULL, 1, 15, 7, NULL, 100, 33, '2025-12-23 10:42:14', '2025-12-23 10:42:14', NULL),
(76, 'bb1da0bd-eee8-4985-a387-bbda255a7412', NULL, NULL, 1, 16, 7, NULL, 100, 33, '2025-12-23 10:42:40', '2025-12-23 10:42:40', NULL),
(77, 'b10d2736-738a-419d-993f-8fa363b92c73', NULL, NULL, 1, 17, 7, NULL, 100, 33, '2025-12-23 10:43:19', '2025-12-23 10:43:19', NULL),
(78, 'cad94e1c-a140-4bea-8c05-c78559708d74', NULL, NULL, 1, 18, 7, NULL, 100, 33, '2025-12-23 10:43:39', '2025-12-23 10:43:39', NULL),
(79, 'dfffc37a-5419-41e5-89a4-e47664b95326', NULL, NULL, 1, 19, 7, NULL, 100, 33, '2025-12-23 10:43:59', '2025-12-23 10:43:59', NULL),
(80, 'bf0059df-c048-4005-9232-b03e524dd53f', NULL, NULL, 1, 20, 7, NULL, 100, 33, '2025-12-23 10:44:18', '2025-12-23 10:44:18', NULL),
(81, '5d475087-8455-4bb1-9e5c-f11705c7b13c', NULL, NULL, 1, 1, 7, NULL, 100, 33, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(82, '1e539b0f-9f72-47f2-82f5-c509d9f444f1', NULL, NULL, 1, 21, 7, NULL, 100, 33, '2025-12-23 10:45:02', '2025-12-23 10:45:02', NULL),
(83, '22b49657-3d87-4063-b8cb-96dee156330d', NULL, NULL, 1, 22, 7, NULL, 100, 33, '2025-12-23 10:45:23', '2025-12-23 10:45:23', NULL),
(84, 'cbb31978-6c96-49b4-bce9-9ea352187680', NULL, NULL, 1, 2, 7, NULL, 100, 33, '2025-12-23 10:45:47', '2025-12-23 10:45:47', NULL),
(85, 'f0270dd5-0b60-4e20-ba95-41d7fc021992', NULL, NULL, 1, 23, 7, NULL, 100, 33, '2025-12-23 10:46:04', '2025-12-23 10:46:04', NULL),
(86, '47535f2f-8916-4ffd-beff-27a53ea75d32', NULL, NULL, 1, 24, 7, NULL, 100, 33, '2025-12-23 10:46:21', '2025-12-23 10:46:21', NULL),
(87, 'e9c94fae-6de3-4bc9-b236-3f8fddba4d91', NULL, NULL, 1, 25, 7, NULL, 100, 33, '2025-12-23 10:46:43', '2025-12-23 10:46:43', NULL),
(88, 'a1f354a0-2671-4ede-a636-74e55add60ff', NULL, NULL, 1, 3, 7, NULL, 100, 33, '2025-12-23 10:47:07', '2025-12-23 10:47:07', NULL),
(89, '727037be-f792-4d1c-8303-f999321ff73f', NULL, NULL, 1, 27, 7, NULL, 100, 33, '2025-12-23 10:47:25', '2025-12-23 10:47:25', NULL),
(90, '20700bd7-ed82-457c-a33e-7ca1e381801e', NULL, NULL, 1, 28, 7, NULL, 100, 33, '2025-12-23 10:47:44', '2025-12-23 10:47:44', NULL),
(91, 'e7f91c4c-db02-435f-bb10-5ab45ec2b2fc', NULL, NULL, 1, 29, 7, NULL, 100, 33, '2025-12-23 10:48:03', '2025-12-23 10:48:03', NULL),
(92, '14c3d89c-db82-408b-b228-c16f85187b1d', NULL, NULL, 1, 30, 7, NULL, 100, 33, '2025-12-23 10:48:20', '2025-12-23 10:48:20', NULL),
(93, 'b1d09749-9186-4695-9ff9-cf5bb0aaa92f', NULL, NULL, 1, 8, 7, NULL, 100, 33, '2025-12-23 10:48:36', '2025-12-23 10:48:36', NULL),
(94, '539ef830-8c6b-4e1a-990e-ccce06673029', NULL, NULL, 1, 31, 7, NULL, 100, 33, '2025-12-23 10:48:56', '2025-12-23 10:48:56', NULL),
(95, '0d8f95f3-c4d9-44d7-b8a4-b7e53a43a7b3', NULL, NULL, 1, 4, 7, NULL, 100, 33, '2025-12-23 10:49:13', '2025-12-23 10:49:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_subject_stream_links`
--

CREATE TABLE `school_subject_stream_links` (
  `id` bigint(20) NOT NULL,
  `school_subject_stream_link_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `school_subject_id` bigint(20) NOT NULL,
  `stream_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `school_subject_stream_links`
--

INSERT INTO `school_subject_stream_links` (`id`, `school_subject_stream_link_uuid`, `school_subject_id`, `stream_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '32eb14c3-90d4-4b69-8b95-3dbe2452a610', 48, 4, '2025-12-23 10:31:50', '2025-12-23 10:31:50', NULL),
(2, '698c8f0e-c094-49c5-9438-82dc1d1d834c', 49, 4, '2025-12-23 10:32:12', '2025-12-23 10:32:12', NULL),
(3, '02a5c207-6c3a-4424-a3c5-c045eabdb572', 50, 3, '2025-12-23 10:32:38', '2025-12-23 10:32:38', NULL),
(4, 'f984f0c8-2df8-4950-bcac-05803e2076c8', 50, 5, '2025-12-23 10:32:38', '2025-12-23 10:32:38', NULL),
(5, 'b226bb07-9eff-4072-91c2-8e8c2d405f05', 51, 3, '2025-12-23 10:33:37', '2025-12-23 10:33:37', NULL),
(6, '5f6286be-964b-40be-9da5-006669c0671b', 51, 5, '2025-12-23 10:33:37', '2025-12-23 10:33:37', NULL),
(7, '85359f28-3d17-4267-891d-669a36166f98', 52, 2, '2025-12-23 10:33:59', '2025-12-23 10:33:59', NULL),
(8, '7a01bf8e-f637-4abe-a9b9-7c5bf36e5336', 52, 3, '2025-12-23 10:33:59', '2025-12-23 10:33:59', NULL),
(9, '27549dbb-41fb-48de-a81e-8915e5bd1c8f', 52, 5, '2025-12-23 10:33:59', '2025-12-23 10:33:59', NULL),
(10, 'acbeec79-e5df-49fb-981b-8265579f63cb', 53, 2, '2025-12-23 10:34:23', '2025-12-23 10:34:23', NULL),
(11, 'e14be331-5716-4ca1-97e7-7f35a5e605f4', 53, 3, '2025-12-23 10:34:23', '2025-12-23 10:34:23', NULL),
(12, 'db95ed14-6748-46df-95a4-5461ac2f21de', 53, 4, '2025-12-23 10:34:23', '2025-12-23 10:34:23', NULL),
(13, '795cab25-aa0b-4fc2-981d-c3e6ff156368', 53, 5, '2025-12-23 10:34:23', '2025-12-23 10:34:23', NULL),
(14, '5cdb7a41-d167-4c34-ac67-d18d6f022805', 54, 1, '2025-12-23 10:34:45', '2025-12-23 10:34:45', NULL),
(15, '0e08a022-65d2-40a9-b2de-deab4f9358d6', 55, 4, '2025-12-23 10:35:02', '2025-12-23 10:35:02', NULL),
(16, '70d49ea4-ea24-49f4-b452-80f3759a6c6d', 56, 1, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(17, 'c38220a5-d309-45cc-8c65-acd484928d65', 56, 2, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(18, '9629de61-ac53-4e99-ad9e-dae120e7039d', 56, 3, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(19, 'd313cdae-8657-4c1b-bf1a-98a163d97cb1', 56, 4, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(20, '98f2b9c0-79c7-4326-ad89-5671798e0182', 56, 5, '2025-12-23 10:35:23', '2025-12-23 10:35:23', NULL),
(21, '198941eb-ddbd-4964-980c-1488621a9556', 57, 1, '2025-12-23 10:35:44', '2025-12-23 10:35:44', NULL),
(22, 'a73b86b9-1f81-4ffd-9157-1811008b75ce', 58, 1, '2025-12-23 10:36:01', '2025-12-23 10:36:01', NULL),
(23, '3e192732-0afc-467c-9252-25652cc873f4', 59, 1, '2025-12-23 10:36:20', '2025-12-23 10:36:20', NULL),
(24, '7de5a9f6-4e31-42ef-a2a8-7a0a71d955e9', 60, 1, '2025-12-23 10:36:38', '2025-12-23 10:36:38', NULL),
(25, '13134ab8-fb02-43d3-868c-d64239c1b75f', 61, 1, '2025-12-23 10:36:56', '2025-12-23 10:36:56', NULL),
(26, 'ff3b025a-c72a-47c6-8687-e8fcfe9832a2', 62, 1, '2025-12-23 10:37:15', '2025-12-23 10:37:15', NULL),
(27, '7ab1be16-2dd1-4c9d-bfa1-6685f74ebb61', 63, 1, '2025-12-23 10:37:33', '2025-12-23 10:37:33', NULL),
(28, '4ae6fd58-5328-4821-8b91-4ea5c2b8f36b', 64, 4, '2025-12-23 10:37:50', '2025-12-23 10:37:50', NULL),
(29, '6fff233e-06e6-4f6b-884c-79a45b9f781d', 64, 2, '2025-12-23 10:37:50', '2025-12-23 10:37:50', NULL),
(30, 'd4ed5440-5f84-48e8-8daf-0772e2f2c653', 64, 5, '2025-12-23 10:37:50', '2025-12-23 10:37:50', NULL),
(31, '74eba0d5-7abd-4e89-a835-8e68ceeb9dfd', 65, 1, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(32, '3971c3d5-525b-4ebf-8415-01d1dc25f64e', 65, 2, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(33, '190ec051-0ba9-4158-8a14-2b70220798e9', 65, 3, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(34, 'c1304f7b-cd26-485b-9caa-f8c82f119b20', 65, 4, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(35, '8c1bef85-c7d5-4b40-aa67-7f0547e27e38', 65, 5, '2025-12-23 10:38:11', '2025-12-23 10:38:11', NULL),
(36, 'a9247a6b-2821-44f1-b1d1-2400d243672a', 66, 2, '2025-12-23 10:38:35', '2025-12-23 10:38:35', NULL),
(37, '109f9745-a101-43fc-9d95-b0c1372e4b32', 66, 3, '2025-12-23 10:38:35', '2025-12-23 10:38:35', NULL),
(38, '138af850-5af2-4554-ae4a-a921271dcae1', 66, 5, '2025-12-23 10:38:35', '2025-12-23 10:38:35', NULL),
(39, 'f308a40f-2ee0-4e77-a5ed-f2568bd17725', 67, 1, '2025-12-23 10:38:54', '2025-12-23 10:38:54', NULL),
(40, '07f8b9ef-ccc4-4bb5-8848-0ad211a44393', 68, 1, '2025-12-23 10:39:11', '2025-12-23 10:39:11', NULL),
(41, 'e449cf02-42b1-47cb-a2a2-cb64ee514f32', 69, 1, '2025-12-23 10:39:28', '2025-12-23 10:39:28', NULL),
(42, '5caa5eaa-7e10-484f-9bc3-b33060d8f10d', 70, 1, '2025-12-23 10:39:59', '2025-12-23 10:39:59', NULL),
(43, 'fa989a9d-0ac1-4dde-971a-74a5dc5d8691', 71, 1, '2025-12-23 10:40:20', '2025-12-23 10:40:20', NULL),
(44, '645e2e8a-0062-42d5-92ec-09b73114685f', 72, 1, '2025-12-23 10:40:37', '2025-12-23 10:40:37', NULL),
(45, '2cdd16cc-3456-49dd-9576-0fd2981cfdad', 73, 4, '2025-12-23 10:41:32', '2025-12-23 10:41:32', NULL),
(46, '122a8e04-3b89-424c-8ae6-b56d9cf9f5ba', 74, 3, '2025-12-23 10:41:53', '2025-12-23 10:41:53', NULL),
(47, '074162e8-3a5a-48b5-9c2d-2aedc161b528', 74, 5, '2025-12-23 10:41:53', '2025-12-23 10:41:53', NULL),
(48, '029d8604-3ca1-47fc-9c0c-410380bc7368', 75, 3, '2025-12-23 10:42:14', '2025-12-23 10:42:14', NULL),
(49, '847a8fb8-a260-4bc4-9aaf-6a0d14b5f83f', 75, 5, '2025-12-23 10:42:14', '2025-12-23 10:42:14', NULL),
(50, 'fa69fbd5-fe4f-4937-8310-4378dcbe485f', 76, 4, '2025-12-23 10:42:40', '2025-12-23 10:42:40', NULL),
(51, '65c97db1-d876-4ba6-ac50-18062aabc72b', 77, 2, '2025-12-23 10:43:19', '2025-12-23 10:43:19', NULL),
(52, '072f291a-45e0-444a-81ef-b159ae0a9a08', 77, 3, '2025-12-23 10:43:19', '2025-12-23 10:43:19', NULL),
(53, 'e5dc9008-586e-4379-bd80-51323512f359', 77, 5, '2025-12-23 10:43:19', '2025-12-23 10:43:19', NULL),
(54, '194a68f8-6636-463b-af6f-1d32a5b094a3', 78, 2, '2025-12-23 10:43:39', '2025-12-23 10:43:39', NULL),
(55, '0eb71e69-affa-4324-aa0b-c46f23eabee6', 78, 3, '2025-12-23 10:43:39', '2025-12-23 10:43:39', NULL),
(56, 'c132de9a-9074-4576-a832-cfdcb63d93a5', 78, 4, '2025-12-23 10:43:39', '2025-12-23 10:43:39', NULL),
(57, '296960f0-27af-4563-a7ee-e5d8df11e94d', 78, 5, '2025-12-23 10:43:39', '2025-12-23 10:43:39', NULL),
(58, 'd23febd9-e047-42ce-bb58-9a3125c2b851', 79, 1, '2025-12-23 10:43:59', '2025-12-23 10:43:59', NULL),
(59, '5f2d39dc-ebc4-4846-a512-2d4904857374', 80, 4, '2025-12-23 10:44:18', '2025-12-23 10:44:18', NULL),
(60, 'afca4bd9-6b78-4eec-99de-ef24f62ec0b6', 81, 1, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(61, '6f0a439c-6ea2-480a-97a8-5f4ce9357b78', 81, 2, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(62, '824ca06f-6b76-4792-8cba-755ebb955e81', 81, 3, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(63, '569a321b-eb68-4101-b222-f9b9d7e31614', 81, 4, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(64, '2b6042aa-d642-4a73-a9f7-e2119bada671', 81, 5, '2025-12-23 10:44:40', '2025-12-23 10:44:40', NULL),
(65, '8c74e4f0-2c2c-4e90-9612-692145bea3ac', 82, 1, '2025-12-23 10:45:02', '2025-12-23 10:45:02', NULL),
(66, '023fb007-bcda-4976-9314-fcb2747f1e13', 83, 1, '2025-12-23 10:45:23', '2025-12-23 10:45:23', NULL),
(67, '82736356-0dce-4427-b594-a463c353f2bb', 84, 1, '2025-12-23 10:45:47', '2025-12-23 10:45:47', NULL),
(68, '32e2ed8c-1f4b-4f6c-84c8-e89912356a34', 85, 1, '2025-12-23 10:46:04', '2025-12-23 10:46:04', NULL),
(69, 'e8729ed1-27db-4511-9689-001db8b8c6e5', 86, 1, '2025-12-23 10:46:21', '2025-12-23 10:46:21', NULL),
(70, '76e30e78-fb46-4a5a-97f7-76035718b94f', 87, 1, '2025-12-23 10:46:43', '2025-12-23 10:46:43', NULL),
(71, 'e7e433d3-2a90-461b-a674-66a07a354826', 88, 2, '2025-12-23 10:47:07', '2025-12-23 10:47:07', NULL),
(72, '7712e9da-071a-43b1-81e1-3132f53839a4', 88, 5, '2025-12-23 10:47:07', '2025-12-23 10:47:07', NULL),
(73, '7ae1d810-792e-4232-98ea-b52473475f6f', 89, 2, '2025-12-23 10:47:25', '2025-12-23 10:47:25', NULL),
(74, '2d5f010e-fa2f-40ab-85be-69fe297a1881', 89, 3, '2025-12-23 10:47:25', '2025-12-23 10:47:25', NULL),
(75, '43dd4b44-1f42-453e-91cc-5d6c5308a513', 89, 5, '2025-12-23 10:47:25', '2025-12-23 10:47:25', NULL),
(76, '9aadd04e-c325-4d3a-afc3-f08b0d9dbfcf', 90, 1, '2025-12-23 10:47:44', '2025-12-23 10:47:44', NULL),
(77, '271a947c-8344-4689-a081-44d561696683', 91, 1, '2025-12-23 10:48:03', '2025-12-23 10:48:03', NULL),
(78, 'ad031053-1dbc-4b4c-9d40-2250ec31f96d', 92, 1, '2025-12-23 10:48:20', '2025-12-23 10:48:20', NULL),
(79, '2eb5c3b1-b136-43de-8924-dc1bfa17d8c2', 93, 1, '2025-12-23 10:48:36', '2025-12-23 10:48:36', NULL),
(80, '7032389f-56d4-4a2f-bf0e-99bfc780415f', 94, 1, '2025-12-23 10:48:56', '2025-12-23 10:48:56', NULL),
(81, '98009cb5-c21c-472c-97ef-778ed9d2a0e3', 95, 1, '2025-12-23 10:49:13', '2025-12-23 10:49:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) NOT NULL,
  `skill_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `pdf_url` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `estimated_time` varchar(255) DEFAULT NULL,
  `category` bigint(20) DEFAULT NULL,
  `difficulty_level_id` bigint(20) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `skill_uuid`, `title`, `description`, `thumbnail_url`, `pdf_url`, `url`, `estimated_time`, `category`, `difficulty_level_id`, `created_by`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '417e9877-a189-4c01-bb54-bf6ca11b0b61', 'Arduino Robotics Course', 'Arduino Robotics Course', 'public/skills/files_1766489311067.jpg', 'public/skills/files_1766489311075.pdf', 'https://www.youtube.com/watch?v=DPqiIzK97K0', '628', 1, 1, 1, 1, '2025-12-23 16:58:31', '2025-12-23 16:58:31', '2025-12-23 16:59:28'),
(2, 'b7404ecd-fa6e-4e4c-9079-44ac841075cc', 'fsdfd', 'fsdffs', 'public/skills/files_1766555209554.jpg', NULL, 'https://youtu.be/FLAQt0iIa-s?si=Q0lvbQr-SXGVKmL5', '50', 2, 3, 1, 1, '2025-12-24 11:16:33', '2025-12-24 11:16:33', '2025-12-24 11:18:10'),
(3, 'a6cf92dc-c29e-445b-9f90-3fac46cf4897', 'etdg', 'fdgd', 'public/skills/files_1766555318927.png', NULL, 'https://youtu.be/FLAQt0iIa-s?si=Q0lvbQr-SXGVKmL5', '50', 2, 3, 1, 1, '2025-12-24 11:18:38', '2025-12-24 11:18:38', '2025-12-24 11:18:57'),
(4, '8fe12b5c-b246-4927-97c9-9f35221654e7', 'dfgdfg', 'dfgdfgd', 'public/skills/files_1766555890018.png', NULL, 'https://youtu.be/FLAQt0iIa-s?si=Q0lvbQr-SXGVKmL5', '50', 2, 3, 1, 1, '2025-12-24 11:28:10', '2025-12-24 11:28:10', '2025-12-24 11:28:13'),
(5, '19c77a2d-20c9-441f-9502-91354df6e222', 'sdsd', 'dfsdf', 'public/skills/files_1766556097214.png', NULL, 'https://youtu.be/FLAQt0iIa-s?si=Q0lvbQr-SXGVKmL5', 'sd', 2, 3, 1, 1, '2025-12-24 11:31:37', '2025-12-24 11:31:37', '2025-12-24 11:31:51'),
(6, '326e14a5-735b-482b-a12f-92d39341cabb', 'dfdf', 'gdfgdfg', 'public/skills/files_1766556372201.png', NULL, 'https://youtu.be/FLAQt0iIa-s?si=Q0lvbQr-SXGVKmL5', '50', 2, 3, 1, 1, '2025-12-24 11:36:12', '2025-12-24 11:36:12', '2025-12-24 11:36:15'),
(7, '808a8c31-b319-46c1-a055-03d77076183a', 'Arduino Robotics Skill Course', 'Arduino Robotics Skill Course', 'public/skills/files_1766558664091.jpg', NULL, 'https://www.youtube.com/watch?v=DPqiIzK97K0', '628', 1, 1, 1, 1, '2025-12-24 12:11:24', '2025-12-24 12:11:24', NULL),
(8, 'eb0cb2d0-7c7b-4066-b73a-00bc5fe9e2d6', 'Scratch Programming', 'Scratch Programming', 'public/skills/files_1766559412900.jpg', NULL, 'https://www.youtube.com/watch?v=JcOcxKWgnps', '20', 1, 1, 1, 1, '2025-12-24 12:26:52', '2025-12-24 12:26:52', NULL),
(9, '5b6b2716-9f92-4c8d-bbcd-5cadb8df3c92', 'Artificial Intelligence', 'Artificial Intelligence', 'public/skills/files_1766559656678.jpg', NULL, 'https://www.youtube.com/watch?v=JMUxmLyrhSk', '292', 6, 1, 1, 1, '2025-12-24 12:30:56', '2025-12-24 12:30:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `country_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `code`, `name`, `country_id`, `created_at`, `updated_at`) VALUES
(1, 'AN', 'Andaman and Nicobar Islands', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(2, 'AP', 'Andhra Pradesh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(3, 'AR', 'Arunachal Pradesh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(4, 'AS', 'Assam', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(5, 'BR', 'Bihar', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(6, 'CH', 'Chandigarh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(7, 'CT', 'Chhattisgarh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(8, 'DN', 'Dadra and Nagar Haveli', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(9, 'DD', 'Daman and Diu', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(10, 'DL', 'Delhi', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(11, 'GA', 'Goa', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(12, 'GJ', 'Gujarat', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(13, 'HR', 'Haryana', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(14, 'HP', 'Himachal Pradesh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(15, 'JK', 'Jammu and Kashmir', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(16, 'JH', 'Jharkhand', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(17, 'KA', 'Karnataka', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(18, 'KL', 'Kerala', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(19, 'LA', 'Ladakh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(20, 'LD', 'Lakshadweep', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(21, 'MP', 'Madhya Pradesh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(22, 'MH', 'Maharashtra', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(23, 'MN', 'Manipur', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(24, 'ML', 'Meghalaya', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(25, 'MZ', 'Mizoram', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(26, 'NL', 'Nagaland', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(27, 'OR', 'Odisha', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(28, 'PY', 'Puducherry', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(29, 'PB', 'Punjab', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(30, 'RJ', 'Rajasthan', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(31, 'SK', 'Sikkim', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(32, 'TN', 'Tamil Nadu', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(33, 'TG', 'Telangana', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(34, 'TR', 'Tripura', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(35, 'UP', 'Uttar Pradesh', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(36, 'UT', 'Uttarakhand', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48'),
(37, 'WB', 'West Bengal', 1, '2025-12-22 13:06:48', '2025-12-22 13:06:48');

-- --------------------------------------------------------

--
-- Table structure for table `stream`
--

CREATE TABLE `stream` (
  `id` bigint(20) NOT NULL,
  `stream_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `stream_name` varchar(150) NOT NULL,
  `stream_description` varchar(512) DEFAULT NULL,
  `school_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `stream`
--

INSERT INTO `stream` (`id`, `stream_uuid`, `stream_name`, `stream_description`, `school_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'c8c893b1-1347-45da-8587-e26ede17f1ec', 'Arts', 'Arts', 1, '2025-12-23 10:14:45', '2025-12-23 10:14:45', NULL),
(2, '9e57ef62-acbb-445b-95d4-159275092fbd', 'PCM', 'Physics Chemistry Mathematics', 1, '2025-12-23 10:15:03', '2025-12-23 10:15:03', NULL),
(3, 'ea493219-f622-4aac-a1c6-adb0ee3da21f', 'PCB', 'Physics Chemistry Biology', 1, '2025-12-23 10:15:18', '2025-12-23 10:15:18', NULL),
(4, '4e713c04-d822-49e1-995c-f674a5afd900', 'Commerce', 'Commerce', 1, '2025-12-23 10:15:28', '2025-12-23 10:15:28', NULL),
(5, 'f0d83f88-a450-4f4b-af6f-74b9258ad22b', 'PCMB', 'Physics Chemistry Mathematics Biology', 1, '2025-12-23 10:15:51', '2025-12-23 10:15:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL,
  `student_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `roll_number` varchar(50) DEFAULT NULL,
  `enrollment_date` datetime DEFAULT NULL,
  `class_section_id` bigint(20) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `gender_id` bigint(20) NOT NULL,
  `guardian_name` varchar(150) NOT NULL,
  `guardian_phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_uuid`, `user_id`, `roll_number`, `enrollment_date`, `class_section_id`, `date_of_birth`, `gender_id`, `guardian_name`, `guardian_phone`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1d6bb9fe-cb02-48ac-b73d-cdc1272c91fa', 9, '123498', NULL, 1, '2011-10-11 05:30:00', 1, 'Raghav Kapoor', '9876545656', 'ABC ABC ABC ABc', '2025-12-23 11:18:17', '2025-12-23 11:18:17', NULL),
(2, 'becf4a14-9201-401b-a80d-de08fef4c91f', 10, '767656', NULL, 9, '2014-06-30 05:30:00', 2, 'Prabudh Bhardwaj', '8987656568', 'ABC ABC Sector-77', '2025-12-23 11:20:25', '2025-12-23 11:20:25', NULL),
(3, '4ea5610f-2f81-470a-b443-39ac26570d4b', 11, '878787878', NULL, 9, '2017-10-24 05:30:00', 1, 'Prince', '9876543212', 'ABC ABC ABC ABC', '2025-12-23 11:21:52', '2025-12-23 11:21:52', NULL),
(4, '5f7d4aa4-1981-4898-85bf-8b8e1304c063', 12, '1234567', NULL, 1, '2012-06-23 05:30:00', 1, 'Gaurav', '9876767676', 'HBH BHB BHBH BHBH', '2025-12-23 11:25:03', '2025-12-23 11:25:03', NULL),
(5, 'a5c9786d-05d3-4a62-84cc-aa966e04d43e', 13, '454522', NULL, 1, '2018-06-06 05:30:00', 1, 'Rishab', '1234567890', 'Sector-102', '2025-12-23 11:27:38', '2025-12-23 11:27:38', NULL),
(6, 'f85e4bc0-a390-4c08-8c97-1697230029df', 14, '1234321', NULL, 11, '2021-05-13 05:30:00', 1, 'Shyam', '9876545656', 'ABC ABC', '2025-12-23 16:12:57', '2025-12-23 16:12:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_assessment_result`
--

CREATE TABLE `student_assessment_result` (
  `id` bigint(20) NOT NULL,
  `student_assessment_result_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `assessment_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `started_at` datetime DEFAULT NULL,
  `submitted_at` datetime DEFAULT NULL,
  `total_questions` int(11) NOT NULL DEFAULT 0,
  `total_questions_attempted` int(11) NOT NULL DEFAULT 0,
  `total_score` float DEFAULT NULL,
  `grade_id` bigint(20) DEFAULT NULL,
  `performance_percentage` float DEFAULT NULL COMMENT 'Percentage of marks obtained out of total marks',
  `completion_percentage` float DEFAULT NULL COMMENT 'Percentage of questions attempted by the student',
  `accuracy_percentage` float DEFAULT NULL COMMENT 'Percentage of correct answers among attempted questions',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student_assessment_result`
--

INSERT INTO `student_assessment_result` (`id`, `student_assessment_result_uuid`, `assessment_id`, `student_id`, `started_at`, `submitted_at`, `total_questions`, `total_questions_attempted`, `total_score`, `grade_id`, `performance_percentage`, `completion_percentage`, `accuracy_percentage`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '5db8d94e-b4a1-4562-9b84-2f99415c8bae', 6, 13, '2025-12-23 17:04:58', '2025-12-23 17:05:50', 10, 10, 5, 6, 50, 100, 50, '2025-12-23 17:04:58', '2025-12-23 17:04:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_class_section_history`
--

CREATE TABLE `student_class_section_history` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `prev_accademic_year_id` bigint(20) NOT NULL,
  `prev_section_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` bigint(20) NOT NULL,
  `subject_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `subject_name` varchar(150) NOT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `subject_uuid`, `subject_name`, `subject_code`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'e484f560-398a-42ea-bccc-f98b8a7f9e13', 'English', 'EN', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, 'c5b2889e-1b85-462c-899a-ab2ec492d80b', 'Hindi', 'HI', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, '6b5e55f5-aec3-4445-9269-ca34e50c0f3b', 'Mathematics', 'MA', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(4, '5710d1cc-5e40-46b8-ab91-886d09a4d304', 'Urdu', 'UR', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(5, '35f0ef5f-49ee-4b55-9171-0d7b4b0a6b50', 'Arts', 'AR', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(6, '42c3c672-5175-441e-aca5-40c59fe9b8e0', 'Physical Education', 'PE', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(7, '420ca12c-dda7-49c2-9d4b-2ce17d6eb1c7', 'Our Wondrous World', 'OWW', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(8, 'b5c356fa-3f07-4778-b973-b5037be7b218', 'Sanskrit', 'SA', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(9, 'f9123eed-1773-4e43-97e8-4a8118436bd1', 'Science', 'SC', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(10, '088c864c-7f97-4f79-b64e-611513c3259a', 'Social Science', 'SS', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(11, '2973fb91-62a7-4c2c-b4f6-dbfb88d98034', 'Vocational Education', 'VE', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(12, '027f31c9-3cd9-4844-9cdf-fa78275a3df8', 'ICT', 'ICT', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(13, 'ccc41fae-2c2d-4dab-b2eb-31fe07794842', 'Accountancy', 'AC', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(14, '8f2d1a05-4b37-4885-b4df-e0cd6a3e299c', 'Biology', 'BI', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(15, '155cf12d-39f9-4cb4-9ead-75f8bfec8b89', 'Biotechnology', 'BT', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(16, '92acb07f-6361-49a1-9026-f5ff1c7c5700', 'Business Studies', 'BS', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(17, '186f287b-907a-43f7-a2b1-13045e6925a4', 'Chemistry', 'CH', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(18, '72b1f7ab-0928-4df5-835a-1c48c42dce94', 'Computer Science', 'CS', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(19, 'a96d109e-3b04-43d4-b111-e0b0b7f66a0e', 'Creative Writing and Translation', 'CWT', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(20, 'a11f0539-7776-457f-87d4-40000d307113', 'Economics', 'EC', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(21, 'cffbaeda-46d9-478c-9243-538e3d4f72f6', 'Fine Arts', 'FA', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(22, '5067f01f-d2b6-4ef2-85c0-89f73b6ecc67', 'Geography', 'GE', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(23, '7d07120d-e1f5-4905-a3b0-0e03e09e6587', 'History', 'HS', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(24, '4c3b7586-b961-462b-ab3a-70a42a1885c0', 'Home Science', 'HM', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(25, 'f07286b9-721d-48bc-9141-088f20a01866', 'Informatics Practices', 'IP', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(26, '8a480f9b-42c7-4357-bd1c-1a1d2bca2a5a', 'Knowledge Tradition and Practice of India', 'KTPI', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(27, 'e36d4066-b70b-426f-bcf7-5f8c5d00a4c6', 'Physics', 'PH', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(28, 'ab6d7ffb-ee4a-4aa0-86b2-b3064c535d2e', 'Political Science', 'PS', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(29, '1f5e17f4-a6bf-4019-9dbd-18f8ca9e7f38', 'Psychology', 'PY', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(30, 'b052f0e8-479f-4a1c-aff7-9297ccefd677', 'Sangeet', 'SG', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(31, 'eb8c2f3d-96f5-4471-8ed1-1b22b5ab6a4f', 'Sociology', 'SO', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `sub_category_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `sub_category_uuid`, `category_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, '55b85365-bcc8-4f36-870b-96bf7f78f396', 1, 'Web Development', 'Frontend and backend web development using modern frameworks.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(2, 'b2b1de0b-5a10-43ca-a30b-29c4bf5e33a0', 1, 'Mobile App Development', 'Building iOS and Android applications using native and cross-platform tools.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(3, '47702215-d969-4163-8b95-7a1e675a4cc7', 1, 'Programming Fundamentals', 'Core programming concepts including data structures and algorithms.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(4, 'd47dc06b-8c4d-4bfb-815f-df2b67f4f8ed', 2, 'Data Visualization', 'Creating insights through data visualization tools and dashboards.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(5, '2c85a243-d85d-4f00-a60a-e298f2780686', 2, 'Statistical Analysis', 'Applying statistical methods to understand data trends and patterns.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(6, 'c7ebeb6d-a84a-44b3-afed-07b1a9afb0c8', 2, 'Machine Learning Basics', 'Introduction to supervised and unsupervised learning techniques.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(7, '921ecf22-845c-437e-8296-3f90ab25217a', 3, 'UI Design', 'Designing intuitive and visually appealing user interfaces.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(8, '2c777452-6212-4181-8909-b0551ee75869', 3, 'UX Research', 'Understanding user needs through research and usability testing.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(9, 'd793a7ac-f239-474f-b500-21d61fc2fe37', 3, 'Graphic Design', 'Creating visual content for digital and print media.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(10, '06d04256-87d3-4d81-b828-a48c6888abfa', 4, 'Communication Skills', 'Enhancing verbal and written communication in professional settings.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(11, 'ffe4bd4a-16c7-4839-8873-3d6edcc7b20d', 4, 'Leadership Development', 'Building leadership and decision-making abilities for team success.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(12, '53acf065-ec8f-441f-b8b5-f7d558762e65', 4, 'Team Collaboration', 'Working effectively within diverse teams to achieve shared goals.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(13, '52b27a30-f0f7-4ef1-9542-ad98945df567', 5, 'Classroom Management', 'Strategies for maintaining an engaging and disciplined classroom.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(14, '5e221a04-f870-4d8f-b3ec-5d73cb5c3b4b', 5, 'Instructional Design', 'Creating effective lesson plans and learning materials.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(15, 'f2e6bc09-becb-4395-9d96-6a99bdcae42d', 5, 'Student Assessment', 'Evaluating student performance using various assessment tools.', '2025-12-22 13:06:50', '2025-12-22 13:06:50'),
(16, '89d41bad-7d26-4108-a498-7787612637d6', 6, 'Other', 'Other sub-category.', '2025-12-22 13:06:50', '2025-12-22 13:06:50');

-- --------------------------------------------------------

--
-- Table structure for table `syllabus`
--

CREATE TABLE `syllabus` (
  `id` bigint(20) NOT NULL,
  `syllabus_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_title` varchar(150) NOT NULL,
  `accademic_year_id` bigint(20) NOT NULL,
  `school_subject_id` bigint(20) NOT NULL,
  `syllabus_description` text DEFAULT NULL,
  `syllabus_link` text DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `syllabus`
--

INSERT INTO `syllabus` (`id`, `syllabus_uuid`, `syllabus_title`, `accademic_year_id`, `school_subject_id`, `syllabus_description`, `syllabus_link`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '55bd5ded-f759-46ec-af77-54ebb3bb7d0d', 'Hindi Syllabus', 3, 1, 'Hindi Syllabus', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(2, '6fb0f1ae-d7c4-4c7f-822c-8245f2fbc98d', 'Class 7th Hindi Syllabus', 3, 14, 'Class 7th Hindi Syllabus', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(3, 'd8cd3f1c-ef9c-497e-b341-c544cafa6f26', 'Hindi Syllabus', 3, 23, 'Hindi Syllabus', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `syllabus_chapter`
--

CREATE TABLE `syllabus_chapter` (
  `id` bigint(20) NOT NULL,
  `syllabus_chapter_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_id` bigint(20) NOT NULL,
  `chapter_id` bigint(20) NOT NULL,
  `syllabus_chapter_title` varchar(250) NOT NULL,
  `syllabus_chapter_description` text DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `syllabus_chapter`
--

INSERT INTO `syllabus_chapter` (`id`, `syllabus_chapter_uuid`, `syllabus_id`, `chapter_id`, `syllabus_chapter_title`, `syllabus_chapter_description`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '97736442-a8c7-46db-a39d-025f942cf75c', 1, 1, 'Chapter 1', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(2, '442fb174-764a-4627-ae35-ee9f21938b79', 1, 2, 'Chapter 2', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(3, 'bc1c088e-660b-4667-852d-4daffae69ab7', 1, 3, 'Chapter 3', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(4, 'e8ac0b26-4e97-4693-9df6-5ef1d9e2f38d', 1, 4, 'Chapter 4', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(5, 'a640eb3e-7723-43c6-9a4d-2e3e30481aa4', 1, 5, 'Chapter 5', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(6, '68358873-7714-4301-81be-81755e32b6a3', 1, 6, 'Chapter 6', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(7, '1d349b4b-444e-4309-98e3-45c5ccc09fde', 1, 7, 'Chapter 7', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(8, '8518c4e7-5f7e-407b-9bde-6727085fad58', 1, 8, 'Chapter 8', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(9, 'ba42311d-3942-40bb-be35-13b4748f53ae', 1, 9, 'Chapter 9', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(10, 'e1b3daa4-aa41-4c2f-8026-1588ce0230a7', 1, 10, 'Chapter 10', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(11, '8c021eb6-987b-4804-905d-bb0f5e7470db', 1, 11, 'Chapter 11', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(12, '58278f07-a40a-4056-95df-e063f68ec751', 1, 12, 'Chapter 12', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(13, 'd5c3075f-7a3e-4c2c-b195-bc69f3edc55e', 1, 13, 'Chapter 13', NULL, 3, '2025-12-23 11:37:11', '2025-12-23 11:37:11', NULL),
(14, 'c4b19cc8-955e-4b5a-99e4-98db062f6c2b', 2, 1, 'Chapter 1', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(15, '846fef26-08f8-4497-99af-6fce6f642352', 2, 2, 'Chapter 2', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(16, 'a92864b4-bfb8-4b84-9688-f8558a7e0e28', 2, 3, 'Chapter 3', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(17, 'b993a1e4-017b-48cd-836c-db8fdfac2782', 2, 4, 'Chapter 4', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(18, '78b9177d-bc74-434c-b453-ee1fa656ea15', 2, 5, 'Chapter 5', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(19, '57a2eac3-5a51-4f79-be53-1b58888e38cf', 2, 6, 'Chapter 6', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(20, '7f6ffa94-30dd-4523-8f3a-123c2f02728b', 2, 7, 'Chapter 7', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(21, '47c6c284-6fa9-476b-b1d4-c381dc8ed41e', 2, 8, 'Chapter 8', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(22, '432e4575-8719-49e9-ab2c-5e3f2740fdc2', 2, 9, 'Chapter 9', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(23, '78376c5c-6e0a-4ee9-8861-41388d77e4ce', 2, 10, 'Chapter 10', NULL, 3, '2025-12-23 11:46:21', '2025-12-23 11:46:21', NULL),
(24, '1426d3ea-dc7b-425e-a556-e669c0ffcea1', 3, 1, 'Chapter 1', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(25, 'c8d63a08-d268-4488-bbcb-cbabb1d77a7d', 3, 2, 'Chapter 2', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(26, '35a1d182-a434-47ec-ad62-be69b0cd6aec', 3, 3, 'Chapter 3', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(27, '5334657f-e322-4d6e-8e68-dba644307470', 3, 4, 'Chapter 4', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(28, '5e54d9a0-bc50-42eb-b52d-be3aa0afb520', 3, 5, 'Chapter 5', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(29, '246ebcb3-99be-46d8-95a2-72e6bbfdd3ae', 3, 6, 'Chapter 6', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(30, '8f8c4ba2-751a-4b20-ba1d-65f85a9c338d', 3, 7, 'Chapter 7', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(31, '75a2a204-8727-4709-9a66-ca79883c2a17', 3, 8, 'Chapter 8', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(32, '3d777b08-8bf3-4345-82d5-2b1554db2bff', 3, 9, 'Chapter 9', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL),
(33, '8ce0a888-4179-47ba-ab97-d90c181cbfcc', 3, 10, 'Chapter 10', NULL, 3, '2025-12-23 11:50:38', '2025-12-23 11:50:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `syllabus_chapter_resource`
--

CREATE TABLE `syllabus_chapter_resource` (
  `id` bigint(20) NOT NULL,
  `syllabus_chapter_resource_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_chapter_resource_link` text NOT NULL,
  `syllabus_chapter_id` bigint(20) NOT NULL,
  `syllabus_resource_type_id` bigint(20) NOT NULL,
  `approved_status` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `syllabus_chapter_resource`
--

INSERT INTO `syllabus_chapter_resource` (`id`, `syllabus_chapter_resource_uuid`, `syllabus_chapter_resource_link`, `syllabus_chapter_id`, `syllabus_resource_type_id`, `approved_status`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '042d3899-6137-4d86-8071-41f79c5209f3', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470111719.pdf', 1, 1, NULL, 3, '2025-12-23 11:38:31', '2025-12-23 11:38:31', NULL),
(2, '2da56c2f-3524-4c54-b4e2-441df708a2b5', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470146694.pdf', 2, 1, NULL, 3, '2025-12-23 11:39:06', '2025-12-23 11:39:06', NULL),
(3, '5de66f7e-2d19-4f0f-af26-c0f8273c4bc5', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470162530.pdf', 3, 1, NULL, 3, '2025-12-23 11:39:22', '2025-12-23 11:39:22', NULL),
(4, '10bb7f9d-232e-4c34-bfd0-51632a767fd4', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470183338.pdf', 4, 1, NULL, 3, '2025-12-23 11:39:43', '2025-12-23 11:39:43', NULL),
(5, '6065f345-e5ae-40b1-8b3f-d16313a6954b', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470196791.pdf', 5, 1, NULL, 3, '2025-12-23 11:39:56', '2025-12-23 11:39:56', NULL),
(6, 'da739b08-a42e-4f90-af1c-3454143441fb', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470211009.pdf', 6, 1, NULL, 3, '2025-12-23 11:40:11', '2025-12-23 11:40:11', NULL),
(7, '308087ee-c295-454b-a1cb-636ee52a3eb0', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470228568.pdf', 7, 1, NULL, 3, '2025-12-23 11:40:28', '2025-12-23 11:40:28', NULL),
(8, 'd7c54cdf-244c-4fc7-bcef-2c8934eda1a0', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470242676.pdf', 8, 1, NULL, 3, '2025-12-23 11:40:42', '2025-12-23 11:40:42', NULL),
(9, '85444f2a-fb36-4565-814a-dcd2f0b3da56', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470257140.pdf', 9, 1, NULL, 3, '2025-12-23 11:40:57', '2025-12-23 11:40:57', NULL),
(10, '23974514-dddb-4a1b-b505-263c12f59799', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470442769.pdf', 10, 1, NULL, 3, '2025-12-23 11:44:02', '2025-12-23 11:44:02', NULL),
(11, '136ab247-b1d7-42d8-80d7-9b2f8ae1d2de', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470458988.pdf', 11, 1, NULL, 3, '2025-12-23 11:44:19', '2025-12-23 11:44:19', NULL),
(12, '33f9c03b-2b00-43dd-ac9a-96d88ed0968e', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470472378.pdf', 12, 1, NULL, 3, '2025-12-23 11:44:32', '2025-12-23 11:44:32', NULL),
(13, 'cd6bb86c-578b-4109-a533-c18a62073aed', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470488865.pdf', 13, 1, NULL, 3, '2025-12-23 11:44:48', '2025-12-23 11:44:48', NULL),
(14, '7d0435fe-c0ea-4b49-8400-c9a494ee8fd6', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470610106.pdf', 14, 1, NULL, 3, '2025-12-23 11:46:50', '2025-12-23 11:46:50', NULL),
(15, '29b0f7a7-6247-49c3-9075-4fc7401d1002', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470623001.pdf', 15, 1, NULL, 3, '2025-12-23 11:47:03', '2025-12-23 11:47:03', NULL),
(16, 'a70493ee-39d9-4f52-88c1-2a7dfd687746', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470634849.pdf', 16, 1, NULL, 3, '2025-12-23 11:47:14', '2025-12-23 11:47:14', NULL),
(17, '030cceb4-0891-4dda-9f2a-df9bba234e5c', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470656014.pdf', 17, 1, NULL, 3, '2025-12-23 11:47:36', '2025-12-23 11:47:36', NULL),
(18, '5937ec60-8b1a-4825-a80a-6747748c25f2', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470673783.pdf', 18, 1, NULL, 3, '2025-12-23 11:47:53', '2025-12-23 11:47:53', NULL),
(19, '305aa481-5f6a-49dd-b17b-dd31d358364a', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470688322.pdf', 19, 1, NULL, 3, '2025-12-23 11:48:08', '2025-12-23 11:48:08', NULL),
(20, '43b969b6-a07b-4b96-882c-a93062fdcb19', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470707983.pdf', 20, 1, NULL, 3, '2025-12-23 11:48:28', '2025-12-23 11:48:28', NULL),
(21, 'e11abb11-90e4-4a36-bd45-1d2b9b038527', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470722421.pdf', 21, 1, NULL, 3, '2025-12-23 11:48:42', '2025-12-23 11:48:42', NULL),
(22, 'f65769b8-c0c0-4c61-b670-3321aa960744', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470737934.pdf', 22, 1, NULL, 3, '2025-12-23 11:48:57', '2025-12-23 11:48:57', NULL),
(23, '8742654f-7a58-4722-8d68-cc76a5ceff46', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470753510.pdf', 23, 1, NULL, 3, '2025-12-23 11:49:13', '2025-12-23 11:49:13', NULL),
(24, '364b8a19-c600-43f4-8e6c-28a44a5e92b5', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470864161.pdf', 24, 1, NULL, 3, '2025-12-23 11:51:04', '2025-12-23 11:51:04', NULL),
(25, '2587194e-ebf7-4637-8ff6-7c8ca2baffbe', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470881805.pdf', 25, 1, NULL, 3, '2025-12-23 11:51:21', '2025-12-23 11:51:21', NULL),
(26, '4a8d17ed-a2ab-4983-a6b5-bc0830715d59', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470896006.pdf', 26, 1, NULL, 3, '2025-12-23 11:51:36', '2025-12-23 11:51:36', NULL),
(27, 'a924a1e7-0a91-46ab-a212-fad1c0ee60fc', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470911927.pdf', 27, 1, NULL, 3, '2025-12-23 11:51:51', '2025-12-23 11:51:51', NULL),
(28, 'ce636636-38eb-42cf-a030-a544936669d1', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470927003.pdf', 28, 1, NULL, 3, '2025-12-23 11:52:07', '2025-12-23 11:52:07', NULL),
(29, 'a58404fb-be19-4335-b5b0-cdf15b94a683', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470947663.pdf', 29, 1, NULL, 3, '2025-12-23 11:52:27', '2025-12-23 11:52:27', NULL),
(30, '8dc65e68-c984-4515-bb5e-ef4a47f4ee11', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470961984.pdf', 30, 1, NULL, 3, '2025-12-23 11:52:42', '2025-12-23 11:52:42', NULL),
(31, '6c723a38-a65e-4ef3-a927-102fc19a4e63', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766470983945.pdf', 31, 1, NULL, 3, '2025-12-23 11:53:04', '2025-12-23 11:53:04', NULL),
(32, '25d03b8f-8cea-4eb9-b579-fb74f5947633', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766471000947.pdf', 32, 1, NULL, 3, '2025-12-23 11:53:21', '2025-12-23 11:53:21', NULL),
(33, 'd76fdb34-3e04-4411-9ee2-700ca6784fc4', 'public/chapter_resource_images/syllabus_chapter_resource_link_1766471014525.pdf', 33, 1, NULL, 3, '2025-12-23 11:53:34', '2025-12-23 11:53:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `syllabus_resource_type`
--

CREATE TABLE `syllabus_resource_type` (
  `id` bigint(20) NOT NULL,
  `syllabus_resource_type_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_resource_type_name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `syllabus_resource_type`
--

INSERT INTO `syllabus_resource_type` (`id`, `syllabus_resource_type_uuid`, `syllabus_resource_type_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'fcdc452e-967b-42bf-8dea-eff71f2f957e', 'PDF', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, '72cae7f2-ab5b-4aa0-b527-6b5242e3ef7d', 'Video', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(3, '240a207e-b025-4279-b16d-7da29faaefff', 'Document', '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) NOT NULL,
  `teacher_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `post_id` int(11) NOT NULL,
  `caste_category_id` int(11) DEFAULT NULL,
  `teacher_code` varchar(50) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `joining_date` datetime NOT NULL,
  `bio` text DEFAULT NULL,
  `profile_image` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `teacher_uuid`, `user_id`, `post_id`, `caste_category_id`, `teacher_code`, `experience_years`, `joining_date`, `bio`, `profile_image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '6bc472eb-abe9-406f-aa0c-f8dbfca7e081', 3, 2, 1, 'TEC001', 10, '2022-02-08 05:30:00', 'BIO', 'public/profile_images/profileImage_1766467847230.jpeg', '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(2, 'e5191a66-6092-463f-88ee-73bbdba5bff6', 4, 3, 1, 'TEC002', 5, '2020-06-08 05:30:00', 'BIO', '', '2025-12-23 11:03:34', '2025-12-23 11:03:34', NULL),
(3, '818bcf4c-b54c-4bb7-afec-726b47681d08', 5, 4, 1, 'TEC003', 9, '2025-12-03 05:30:00', 'BIO', '', '2025-12-23 11:05:48', '2025-12-23 11:05:48', NULL),
(4, 'ebbcecf8-5666-4c38-9db7-54369cae2a88', 6, 5, 1, 'TEC004', 8, '2021-02-23 05:30:00', 'BIO', '', '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(5, '92bcde02-b63b-4f24-8cad-1189a5cd8a67', 7, 7, 1, 'TEC005', 15, '2010-06-23 05:30:00', 'BIO', '', '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(6, '64274697-e7d5-4c56-beb5-a30c852ff9ae', 8, 8, 1, 'TEC006', 8, '2013-06-23 05:30:00', 'BIO', '', '2025-12-23 11:12:26', '2025-12-23 11:12:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_class_map`
--

CREATE TABLE `teacher_class_map` (
  `id` bigint(20) NOT NULL,
  `accademic_year_id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) NOT NULL,
  `class_section_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher_class_map`
--

INSERT INTO `teacher_class_map` (`id`, `accademic_year_id`, `teacher_id`, `class_section_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 1, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(2, 3, 1, 5, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(3, 3, 1, 9, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(4, 3, 2, 11, '2025-12-23 11:03:34', '2025-12-23 11:03:34', NULL),
(5, 3, 2, 13, '2025-12-23 11:03:35', '2025-12-23 11:03:35', NULL),
(6, 3, 2, 17, '2025-12-23 11:03:35', '2025-12-23 11:03:35', NULL),
(7, 3, 3, 24, '2025-12-23 11:05:48', '2025-12-23 11:05:48', NULL),
(8, 3, 4, 23, '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(9, 3, 4, 22, '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(10, 3, 5, 23, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(11, 3, 5, 17, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(12, 3, 5, 18, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(13, 3, 6, 8, '2025-12-23 11:12:27', '2025-12-23 11:12:27', NULL),
(14, 3, 6, 6, '2025-12-23 11:12:27', '2025-12-23 11:12:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_content_report`
--

CREATE TABLE `teacher_content_report` (
  `id` bigint(20) NOT NULL,
  `accademic_year_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `class_section_id` bigint(20) DEFAULT NULL,
  `syllabus_id` bigint(20) NOT NULL,
  `syllabus_chapter_id` bigint(20) NOT NULL,
  `syllabus_resource_type_id` bigint(20) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher_content_report`
--

INSERT INTO `teacher_content_report` (`id`, `accademic_year_id`, `user_id`, `class_id`, `class_section_id`, `syllabus_id`, `syllabus_chapter_id`, `syllabus_resource_type_id`, `count`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 3, 1, NULL, 1, 1, 1, 1, '2025-12-23 11:38:31', '2025-12-23 11:38:31', NULL),
(2, 3, 3, 1, NULL, 1, 2, 1, 1, '2025-12-23 11:39:06', '2025-12-23 11:39:06', NULL),
(3, 3, 3, 1, NULL, 1, 3, 1, 1, '2025-12-23 11:39:22', '2025-12-23 11:39:22', NULL),
(4, 3, 3, 1, NULL, 1, 4, 1, 1, '2025-12-23 11:39:43', '2025-12-23 11:39:43', NULL),
(5, 3, 3, 1, NULL, 1, 5, 1, 1, '2025-12-23 11:39:56', '2025-12-23 11:39:56', NULL),
(6, 3, 3, 1, NULL, 1, 6, 1, 1, '2025-12-23 11:40:11', '2025-12-23 11:40:11', NULL),
(7, 3, 3, 1, NULL, 1, 7, 1, 1, '2025-12-23 11:40:28', '2025-12-23 11:40:28', NULL),
(8, 3, 3, 1, NULL, 1, 8, 1, 1, '2025-12-23 11:40:42', '2025-12-23 11:40:42', NULL),
(9, 3, 3, 1, NULL, 1, 9, 1, 1, '2025-12-23 11:40:57', '2025-12-23 11:40:57', NULL),
(10, 3, 3, 1, NULL, 1, 10, 1, 1, '2025-12-23 11:44:02', '2025-12-23 11:44:02', NULL),
(11, 3, 3, 1, NULL, 1, 11, 1, 1, '2025-12-23 11:44:19', '2025-12-23 11:44:19', NULL),
(12, 3, 3, 1, NULL, 1, 12, 1, 1, '2025-12-23 11:44:32', '2025-12-23 11:44:32', NULL),
(13, 3, 3, 1, NULL, 1, 13, 1, 1, '2025-12-23 11:44:48', '2025-12-23 11:44:48', NULL),
(14, 3, 3, 2, NULL, 2, 14, 1, 1, '2025-12-23 11:46:50', '2025-12-23 11:46:50', NULL),
(15, 3, 3, 2, NULL, 2, 15, 1, 1, '2025-12-23 11:47:03', '2025-12-23 11:47:03', NULL),
(16, 3, 3, 2, NULL, 2, 16, 1, 1, '2025-12-23 11:47:14', '2025-12-23 11:47:14', NULL),
(17, 3, 3, 2, NULL, 2, 17, 1, 1, '2025-12-23 11:47:36', '2025-12-23 11:47:36', NULL),
(18, 3, 3, 2, NULL, 2, 18, 1, 1, '2025-12-23 11:47:53', '2025-12-23 11:47:53', NULL),
(19, 3, 3, 2, NULL, 2, 19, 1, 1, '2025-12-23 11:48:08', '2025-12-23 11:48:08', NULL),
(20, 3, 3, 2, NULL, 2, 20, 1, 1, '2025-12-23 11:48:28', '2025-12-23 11:48:28', NULL),
(21, 3, 3, 2, NULL, 2, 21, 1, 1, '2025-12-23 11:48:42', '2025-12-23 11:48:42', NULL),
(22, 3, 3, 2, NULL, 2, 22, 1, 1, '2025-12-23 11:48:58', '2025-12-23 11:48:58', NULL),
(23, 3, 3, 2, NULL, 2, 23, 1, 1, '2025-12-23 11:49:13', '2025-12-23 11:49:13', NULL),
(24, 3, 3, 3, NULL, 3, 24, 1, 1, '2025-12-23 11:51:04', '2025-12-23 11:51:04', NULL),
(25, 3, 3, 3, NULL, 3, 25, 1, 1, '2025-12-23 11:51:21', '2025-12-23 11:51:21', NULL),
(26, 3, 3, 3, NULL, 3, 26, 1, 1, '2025-12-23 11:51:36', '2025-12-23 11:51:36', NULL),
(27, 3, 3, 3, NULL, 3, 27, 1, 1, '2025-12-23 11:51:52', '2025-12-23 11:51:52', NULL),
(28, 3, 3, 3, NULL, 3, 28, 1, 1, '2025-12-23 11:52:07', '2025-12-23 11:52:07', NULL),
(29, 3, 3, 3, NULL, 3, 29, 1, 1, '2025-12-23 11:52:27', '2025-12-23 11:52:27', NULL),
(30, 3, 3, 3, NULL, 3, 30, 1, 1, '2025-12-23 11:52:42', '2025-12-23 11:52:42', NULL),
(31, 3, 3, 3, NULL, 3, 31, 1, 1, '2025-12-23 11:53:04', '2025-12-23 11:53:04', NULL),
(32, 3, 3, 3, NULL, 3, 32, 1, 1, '2025-12-23 11:53:21', '2025-12-23 11:53:21', NULL),
(33, 3, 3, 3, NULL, 3, 33, 1, 1, '2025-12-23 11:53:34', '2025-12-23 11:53:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_qualifications`
--

CREATE TABLE `teacher_qualifications` (
  `id` int(11) NOT NULL,
  `teachers_id` bigint(20) NOT NULL,
  `qualification_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher_qualifications`
--

INSERT INTO `teacher_qualifications` (`id`, `teachers_id`, `qualification_id`, `created_at`, `updated_at`) VALUES
(1, 1, 13, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(2, 2, 7, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(3, 3, 3, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(4, 4, 6, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(5, 5, 9, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(6, 5, 2, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(7, 6, 3, '2025-12-23 11:12:26', '2025-12-23 11:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subject_map`
--

CREATE TABLE `teacher_subject_map` (
  `id` bigint(20) NOT NULL,
  `teacher_class_map_id` bigint(20) NOT NULL,
  `school_subject_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher_subject_map`
--

INSERT INTO `teacher_subject_map` (`id`, `teacher_class_map_id`, `school_subject_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(2, 2, 14, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(3, 3, 23, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(4, 4, 31, '2025-12-23 11:03:34', '2025-12-23 11:03:34', NULL),
(5, 5, 40, '2025-12-23 11:03:35', '2025-12-23 11:03:35', NULL),
(6, 6, 56, '2025-12-23 11:03:35', '2025-12-23 11:03:35', NULL),
(7, 7, 76, '2025-12-23 11:05:49', '2025-12-23 11:05:49', NULL),
(8, 7, 73, '2025-12-23 11:05:49', '2025-12-23 11:05:49', NULL),
(9, 8, 75, '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(10, 9, 74, '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(11, 10, 77, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(12, 11, 52, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(13, 12, 52, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(14, 13, 23, '2025-12-23 11:12:27', '2025-12-23 11:12:27', NULL),
(15, 14, 13, '2025-12-23 11:12:27', '2025-12-23 11:12:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_photo_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 0,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_uuid`, `school_id`, `role_id`, `name`, `email`, `phone`, `password_hash`, `profile_photo_url`, `is_active`, `is_verified`, `last_login_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '7e05a72b-0a91-4f1a-940b-e0c501b40591', NULL, 1, 'Super Admin', 'superadmin@lms.com', '+1-555-0000', '$2b$10$e4UG2w4SGKrv1N8kMEaGMeHVtPGMxuJuAmq13BKxjJhe/hv25SdHm', NULL, 1, 1, NULL, '2025-12-22 13:06:49', '2025-12-22 13:06:49', NULL),
(2, '1cf79a00-0ab6-4324-98dc-ff297764810e', 1, 2, 'Ganga International School', 'ankit.bhatnagar@glocalview.com', '8448222971', '$2b$10$nZWwiEcQXGqkPlT2P07KGO3myy6eTHiPmjDKLRk1EjSniV2rVyHRi', 'public/profile_images/logo_url_1766465029236.png', 1, 1, NULL, '2025-12-23 10:13:49', '2025-12-23 10:13:49', NULL),
(3, '2bf4da8a-7edb-4bd6-99f3-fe83547fb6d5', 1, 3, 'Ankit Bhatnagar', 'bhatnagar819@gmail.com', '8448222971', '$2b$10$Z3dkWDV0zKxnkkeYlz/3CurEWEb4S73/ASA9VKER3vLgj/KM6qMym', 'public/profile_images/profileImage_1766467847230.jpeg', 1, 1, NULL, '2025-12-23 11:00:47', '2025-12-23 11:00:47', NULL),
(4, '5e627412-de80-4183-845c-82dca0ae9be1', 1, 3, 'Bipin Sharma', 'bipin.sharma@glocalview.com', '9990259853', '$2b$10$yfcgERj/mq977uvF43fmZuGKz8rtk37m8iRgWUP.AQWnb96OIgaUC', NULL, 1, 1, NULL, '2025-12-23 11:03:34', '2025-12-23 11:03:34', NULL),
(5, 'db5c2e0e-18a4-4762-be57-608868f3e081', 1, 3, 'Gaurav Sharma', 'gaurav.sharma@glocalview.com', '9876543211', '$2b$10$B7UyRkDL/mwhsp5vmaIEBuSQ6UV5zV.sO0xgT1UD4XrlHLskT12by', NULL, 1, 1, NULL, '2025-12-23 11:05:48', '2025-12-23 11:05:48', NULL),
(6, 'aaca81b9-04e6-4b56-a11a-bfd5a3b7ccea', 1, 3, 'Umesh Kumar', 'umesh.kumar@glocalview.com', '9876543210', '$2b$10$KA/S8vthS8FIDFh9U.pZyOpLdXBCC4KpJyRratQScxO4/8xXST25W', NULL, 1, 1, NULL, '2025-12-23 11:07:27', '2025-12-23 11:07:27', NULL),
(7, '015e973d-6d29-45b8-8162-2a0094eb0e6a', 1, 3, 'Prince Kushwaha', 'prince@glocalview.com', '9876543222', '$2b$10$R/X6o.8Ofy8yOaKsfRpGzOr64K1TK2qu.kScHtovxXj.hlYi7yNlW', NULL, 1, 1, NULL, '2025-12-23 11:09:53', '2025-12-23 11:09:53', NULL),
(8, '7ed10ddb-5ec2-422e-86cf-7f7d8b6b5dd0', 1, 3, 'Prabudh Agarwal', 'prabudh@glocalview.com', '9876543434', '$2b$10$DaLUvHNwvOBxfGJWz60YFOv3ge.ydHagDyS2hzylLbfwRgCrMfn.m', NULL, 1, 1, NULL, '2025-12-23 11:12:26', '2025-12-23 11:12:26', NULL),
(9, '5f8aea86-f7e2-42ed-9f4a-1645c4a4d562', 1, 4, 'Sanjeev Kapoor', 'sanjeev@glocalview.com', '9876545678', '$2b$10$AutqpE8Gf4ODr2uvbelDL.kna/v8IAnvpX/3o3qPuHqJ0TBK/XRsS', NULL, 1, 1, NULL, '2025-12-23 11:18:17', '2025-12-23 11:18:17', NULL),
(10, '2111a93a-4c19-4fe6-bff6-35633d7f8991', 1, 4, 'Jyoti Bhardwaj', 'jyoti@glocalview.com', '9876598765', '$2b$10$OAHZOfkiEF.eWRXyIECYIu7jgqM6ZxDYNxZZ4uVKj2RGmjjMCz0J.', NULL, 1, 1, NULL, '2025-12-23 11:20:25', '2025-12-26 11:43:44', NULL),
(11, 'e9fc5954-e47d-4eeb-9f82-ea53d6263994', 1, 4, 'Hemanto', 'hemanto@glocalview.com', '8787878787', '$2b$10$.vDTyFtFI9hyJQQQO3zP5uk/v2Rhy0dhgFgFRjuX41l.Xt1KrUw4K', NULL, 1, 1, NULL, '2025-12-23 11:21:52', '2025-12-23 11:21:52', NULL),
(12, 'a9738872-1212-4a6a-ac74-ab018224b921', 1, 4, 'Ankit Tewatia', 'ankit@glocalview.com', '1234567890', '$2b$10$VHdLubEGBrmx1QVq5wqSXOL5ktisUIANOilqHgfyeF3e32V56sFoS', NULL, 1, 1, NULL, '2025-12-23 11:25:03', '2025-12-23 11:25:03', NULL),
(13, '2d2bb85e-ec95-473d-9c18-1bfbdc342499', 1, 4, 'Tushar', 'tushar@glocalview.com', '1234565561', '$2b$10$gCMRy4L1/06vCVR92zLPeuLYxcInGCmTIXT6jhjdovs3C5nI79dzq', NULL, 1, 1, NULL, '2025-12-23 11:27:38', '2025-12-23 11:27:38', NULL),
(14, '6b077cee-3d9c-4f49-af20-3086647d8fe2', 1, 4, 'Sanjeev Singh', 'sanjeev.@glocalview.com', '8909878978', '$2b$10$etIYxJVvmBZ2HETjD9qPieZOkM.JQwKHsjS5VJjX0p2VRlVcHLV3G', NULL, 1, 1, NULL, '2025-12-23 16:12:57', '2025-12-23 16:12:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_course_enrollments`
--

CREATE TABLE `user_course_enrollments` (
  `id` bigint(20) NOT NULL,
  `user_course_enrollment_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `progress_status_id` bigint(20) DEFAULT NULL,
  `progress_percentage` int(11) DEFAULT 0,
  `started_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_course_enrollments`
--

INSERT INTO `user_course_enrollments` (`id`, `user_course_enrollment_uuid`, `user_id`, `course_id`, `progress_status_id`, `progress_percentage`, `started_at`, `completed_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'fe7231b8-45f5-47a1-8b8e-7c80ab579bfd', 9, 6, 2, 50, '2025-12-23 16:23:20', NULL, '2025-12-23 16:23:20', '2025-12-23 16:23:24', NULL),
(2, '6daf356b-e58d-4599-a1c4-b083054866e1', 13, 6, 3, 100, '2025-12-23 17:08:22', '2025-12-23 17:17:54', '2025-12-23 17:08:22', '2025-12-23 17:17:54', NULL),
(3, '657454b6-9168-4463-8f8d-1ced2236fc0a', 13, 5, 2, 50, '2025-12-24 12:16:15', NULL, '2025-12-24 12:16:15', '2025-12-24 12:16:22', NULL),
(4, 'be64d471-efff-4285-8e2f-fd4fc03fbd64', 13, 8, 2, 50, '2025-12-24 14:30:13', NULL, '2025-12-24 14:30:13', '2025-12-24 14:30:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `token` varchar(500) NOT NULL,
  `fcm` varchar(255) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`id`, `user_id`, `token`, `fcm`, `device_id`, `device_name`, `ip_address`, `created_at`, `updated_at`) VALUES
(28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQGxtcy5jb20iLCJyb2xlSWQiOjEsInNjaG9vbFV1aWQiOiIiLCJpYXQiOjE3NjY1NzAwMDIsImV4cCI6MTc2NzE3NDgwMn0.SORxuJjIIKAly2mIqXNRmfPOrXuCFl4mExVTTfLSsJ8', NULL, NULL, NULL, NULL, '2025-12-24 15:23:22', '2025-12-24 15:23:22'),
(30, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQGxtcy5jb20iLCJyb2xlSWQiOjEsInNjaG9vbFV1aWQiOiIiLCJpYXQiOjE3NjY1NzA4MzksImV4cCI6MTc2NzE3NTYzOX0.AsmGiG4NsOLuVv12aAu1PIgzfGaar6AXh6l5A2KgOnI', NULL, NULL, NULL, NULL, '2025-12-24 15:37:19', '2025-12-24 15:37:19'),
(31, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJiaGF0bmFnYXI4MTlAZ21haWwuY29tIiwicm9sZUlkIjozLCJzY2hvb2xVdWlkIjoiMWVmNTg1OTItYjUxNC00ZjcwLWJlNDAtOTk3N2E4MGQxZmIyIiwiaWF0IjoxNzY3MTU0NjA5LCJleHAiOjE3Njc3NTk0MDl9.Y9jJJWKNd41WnvhKcvk4V9tggtw7VMWG6ZVkHYFITJ0', NULL, NULL, NULL, NULL, '2025-12-24 15:41:43', '2025-12-24 15:41:43'),
(32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQGxtcy5jb20iLCJyb2xlSWQiOjEsInNjaG9vbFV1aWQiOiIiLCJpYXQiOjE3NjY3MjkyNzUsImV4cCI6MTc2NzMzNDA3NX0.86JPeXShUhspJlYPa3685XuF5LS8Pr-3VxBN34ijSU4', NULL, NULL, NULL, NULL, '2025-12-26 11:37:55', '2025-12-26 11:37:55'),
(33, 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoianlvdGlAZ2xvY2Fsdmlldy5jb20iLCJyb2xlSWQiOjQsInNjaG9vbFV1aWQiOiIxZWY1ODU5Mi1iNTE0LTRmNzAtYmU0MC05OTc3YTgwZDFmYjIiLCJpYXQiOjE3NjY3Mjk2MzUsImV4cCI6MTc2NzMzNDQzNX0.GwogYIrkOjbKEUjcBcwY0Wd7Pr93YRPvjFMUwJMCwPg', NULL, NULL, NULL, NULL, '2025-12-26 11:43:55', '2025-12-26 11:43:55'),
(34, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQGxtcy5jb20iLCJyb2xlSWQiOjEsInNjaG9vbFV1aWQiOiIiLCJpYXQiOjE3Njc1OTQyNjcsImV4cCI6MTc2ODE5OTA2N30.IxE8enGZEWKXrfEz566T6eiVwiUNO8qr4HPWkNNoExQ', NULL, NULL, NULL, NULL, '2026-01-05 11:54:27', '2026-01-05 11:54:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `is_allowed` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_permissions`
--

INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `is_allowed`, `created_at`, `updated_at`) VALUES
(1, 3, 10, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(2, 3, 9, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(3, 3, 11, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(4, 3, 12, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(5, 3, 72, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(6, 3, 73, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(7, 3, 74, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(8, 3, 75, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(9, 3, 55, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(10, 3, 47, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(11, 3, 48, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(12, 3, 49, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(13, 3, 50, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(14, 3, 18, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(15, 3, 17, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(16, 3, 19, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(17, 3, 20, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(18, 3, 21, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(19, 3, 22, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(20, 3, 28, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(21, 3, 27, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(22, 3, 29, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(23, 3, 30, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(24, 3, 51, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(25, 3, 52, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(26, 3, 53, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(27, 3, 54, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(28, 3, 31, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(29, 3, 63, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(30, 3, 64, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(31, 3, 71, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(32, 3, 77, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(33, 3, 44, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(34, 3, 43, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(35, 3, 45, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(36, 3, 46, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(37, 3, 39, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(38, 3, 40, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(39, 3, 41, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(40, 3, 42, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(41, 3, 67, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(42, 3, 68, 1, '2025-12-23 11:00:47', '2025-12-23 11:00:47'),
(43, 4, 10, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(44, 4, 9, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(45, 4, 11, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(46, 4, 12, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(47, 4, 72, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(48, 4, 73, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(49, 4, 74, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(50, 4, 75, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(51, 4, 55, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(52, 4, 47, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(53, 4, 48, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(54, 4, 49, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(55, 4, 50, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(56, 4, 18, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(57, 4, 17, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(58, 4, 19, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(59, 4, 20, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(60, 4, 21, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(61, 4, 22, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(62, 4, 28, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(63, 4, 27, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(64, 4, 29, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(65, 4, 30, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(66, 4, 51, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(67, 4, 52, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(68, 4, 53, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(69, 4, 54, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(70, 4, 31, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(71, 4, 63, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(72, 4, 64, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(73, 4, 71, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(74, 4, 77, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(75, 4, 44, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(76, 4, 43, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(77, 4, 45, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(78, 4, 46, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(79, 4, 39, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(80, 4, 40, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(81, 4, 41, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(82, 4, 42, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(83, 4, 67, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(84, 4, 68, 1, '2025-12-23 11:03:34', '2025-12-23 11:03:34'),
(85, 5, 10, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(86, 5, 9, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(87, 5, 11, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(88, 5, 12, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(89, 5, 72, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(90, 5, 73, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(91, 5, 74, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(92, 5, 75, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(93, 5, 55, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(94, 5, 47, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(95, 5, 48, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(96, 5, 49, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(97, 5, 50, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(98, 5, 18, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(99, 5, 17, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(100, 5, 19, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(101, 5, 20, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(102, 5, 21, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(103, 5, 22, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(104, 5, 28, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(105, 5, 27, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(106, 5, 29, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(107, 5, 30, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(108, 5, 51, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(109, 5, 52, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(110, 5, 53, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(111, 5, 54, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(112, 5, 31, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(113, 5, 63, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(114, 5, 64, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(115, 5, 71, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(116, 5, 77, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(117, 5, 44, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(118, 5, 43, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(119, 5, 45, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(120, 5, 46, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(121, 5, 39, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(122, 5, 40, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(123, 5, 41, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(124, 5, 42, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(125, 5, 67, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(126, 5, 68, 1, '2025-12-23 11:05:48', '2025-12-23 11:05:48'),
(127, 6, 10, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(128, 6, 9, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(129, 6, 11, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(130, 6, 12, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(131, 6, 72, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(132, 6, 73, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(133, 6, 74, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(134, 6, 75, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(135, 6, 55, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(136, 6, 47, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(137, 6, 48, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(138, 6, 49, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(139, 6, 50, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(140, 6, 18, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(141, 6, 17, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(142, 6, 19, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(143, 6, 20, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(144, 6, 21, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(145, 6, 22, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(146, 6, 28, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(147, 6, 27, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(148, 6, 29, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(149, 6, 30, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(150, 6, 51, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(151, 6, 52, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(152, 6, 53, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(153, 6, 54, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(154, 6, 31, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(155, 6, 63, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(156, 6, 64, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(157, 6, 71, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(158, 6, 77, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(159, 6, 44, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(160, 6, 43, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(161, 6, 45, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(162, 6, 46, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(163, 6, 39, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(164, 6, 40, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(165, 6, 41, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(166, 6, 42, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(167, 6, 67, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(168, 6, 68, 1, '2025-12-23 11:07:27', '2025-12-23 11:07:27'),
(169, 7, 10, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(170, 7, 9, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(171, 7, 11, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(172, 7, 12, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(173, 7, 72, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(174, 7, 73, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(175, 7, 74, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(176, 7, 75, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(177, 7, 55, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(178, 7, 47, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(179, 7, 48, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(180, 7, 49, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(181, 7, 50, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(182, 7, 18, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(183, 7, 17, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(184, 7, 19, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(185, 7, 20, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(186, 7, 21, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(187, 7, 22, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(188, 7, 28, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(189, 7, 27, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(190, 7, 29, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(191, 7, 30, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(192, 7, 51, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(193, 7, 52, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(194, 7, 53, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(195, 7, 54, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(196, 7, 31, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(197, 7, 63, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(198, 7, 64, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(199, 7, 71, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(200, 7, 77, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(201, 7, 44, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(202, 7, 43, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(203, 7, 45, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(204, 7, 46, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(205, 7, 39, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(206, 7, 40, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(207, 7, 41, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(208, 7, 42, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(209, 7, 67, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(210, 7, 68, 1, '2025-12-23 11:09:53', '2025-12-23 11:09:53'),
(211, 8, 10, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(212, 8, 9, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(213, 8, 11, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(214, 8, 12, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(215, 8, 72, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(216, 8, 73, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(217, 8, 74, 1, '2025-12-23 11:12:26', '2025-12-23 11:12:26'),
(218, 8, 75, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(219, 8, 55, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(220, 8, 47, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(221, 8, 48, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(222, 8, 49, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(223, 8, 50, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(224, 8, 18, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(225, 8, 17, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(226, 8, 19, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(227, 8, 20, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(228, 8, 21, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(229, 8, 22, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(230, 8, 28, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(231, 8, 27, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(232, 8, 29, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(233, 8, 30, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(234, 8, 51, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(235, 8, 52, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(236, 8, 53, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(237, 8, 54, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(238, 8, 31, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(239, 8, 63, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(240, 8, 64, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(241, 8, 71, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(242, 8, 77, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(243, 8, 44, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(244, 8, 43, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(245, 8, 45, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(246, 8, 46, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(247, 8, 39, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(248, 8, 40, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(249, 8, 41, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(250, 8, 42, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(251, 8, 67, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(252, 8, 68, 1, '2025-12-23 11:12:27', '2025-12-23 11:12:27'),
(253, 9, 18, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(254, 9, 22, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(255, 9, 28, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(256, 9, 52, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(257, 9, 31, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(258, 9, 63, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(259, 9, 64, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(260, 9, 77, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(261, 9, 72, 1, '2025-12-23 11:18:17', '2025-12-23 11:18:17'),
(262, 10, 18, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(263, 10, 22, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(264, 10, 28, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(265, 10, 52, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(266, 10, 31, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(267, 10, 63, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(268, 10, 64, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(269, 10, 77, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(270, 10, 72, 1, '2025-12-23 11:20:25', '2025-12-23 11:20:25'),
(271, 11, 18, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(272, 11, 22, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(273, 11, 28, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(274, 11, 52, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(275, 11, 31, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(276, 11, 63, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(277, 11, 64, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(278, 11, 77, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(279, 11, 72, 1, '2025-12-23 11:21:52', '2025-12-23 11:21:52'),
(280, 12, 18, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(281, 12, 22, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(282, 12, 28, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(283, 12, 52, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(284, 12, 31, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(285, 12, 63, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(286, 12, 64, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(287, 12, 77, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(288, 12, 72, 1, '2025-12-23 11:25:03', '2025-12-23 11:25:03'),
(289, 13, 18, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(290, 13, 22, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(291, 13, 28, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(292, 13, 52, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(293, 13, 31, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(294, 13, 63, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(295, 13, 64, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(296, 13, 77, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(297, 13, 72, 1, '2025-12-23 11:27:38', '2025-12-23 11:27:38'),
(298, 14, 18, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(299, 14, 22, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(300, 14, 28, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(301, 14, 52, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(302, 14, 31, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(303, 14, 63, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(304, 14, 64, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(305, 14, 77, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57'),
(306, 14, 72, 1, '2025-12-23 16:12:57', '2025-12-23 16:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

CREATE TABLE `user_skills` (
  `id` bigint(20) NOT NULL,
  `user_skill_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  `status_id` bigint(20) DEFAULT NULL,
  `progress_percent` int(11) DEFAULT 33,
  `completed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_skills`
--

INSERT INTO `user_skills` (`id`, `user_skill_uuid`, `user_id`, `skill_id`, `status_id`, `progress_percent`, `completed_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'da884b54-1f9d-4540-8179-f70762625984', 13, 7, 2, 50, NULL, '2025-12-24 12:12:13', '2025-12-24 12:12:13', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accademic_year`
--
ALTER TABLE `accademic_year`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accademic_year_uuid` (`accademic_year_uuid`);

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_uuid` (`assessment_uuid`),
  ADD KEY `assessment_type_id` (`assessment_type_id`),
  ADD KEY `school_subject_id` (`school_subject_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `class_section_id` (`class_section_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `assessment_course_id_foreign_idx` (`course_id`),
  ADD KEY `assessment_added_by_foreign_idx` (`added_by`);

--
-- Indexes for table `assessment_class_section_link`
--
ALTER TABLE `assessment_class_section_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_id` (`assessment_id`),
  ADD KEY `class_section_id` (`class_section_id`);

--
-- Indexes for table `assessment_question`
--
ALTER TABLE `assessment_question`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_question_uuid` (`assessment_question_uuid`),
  ADD KEY `assessment_id` (`assessment_id`),
  ADD KEY `assessment_question_type_id` (`assessment_question_type_id`);

--
-- Indexes for table `assessment_question_option`
--
ALTER TABLE `assessment_question_option`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_question_option_uuid` (`assessment_question_option_uuid`),
  ADD KEY `assessment_question_id` (`assessment_question_id`);

--
-- Indexes for table `assessment_question_type`
--
ALTER TABLE `assessment_question_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_question_type_uuid` (`assessment_question_type_uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `assessment_student_answer`
--
ALTER TABLE `assessment_student_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_assessment_result_id` (`student_assessment_result_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `assessment_type`
--
ALTER TABLE `assessment_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_type_uuid` (`assessment_type_uuid`),
  ADD UNIQUE KEY `assessment_type_name` (`assessment_type_name`);

--
-- Indexes for table `caste_categories`
--
ALTER TABLE `caste_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_uuid` (`category_uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chapter_uuid` (`chapter_uuid`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_uuid` (`class_uuid`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `class_section`
--
ALTER TABLE `class_section`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_section_uuid` (`class_section_uuid`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `stream_id` (`stream_id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_uuid` (`course_uuid`),
  ADD KEY `sub_category_id` (`sub_category_id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `difficulty_level_id` (`difficulty_level_id`),
  ADD KEY `course_type_id` (`course_type_id`),
  ADD KEY `course_structure_type_id` (`course_structure_type_id`);

--
-- Indexes for table `course_additional_documents`
--
ALTER TABLE `course_additional_documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document_uuid` (`document_uuid`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `course_class_section_link`
--
ALTER TABLE `course_class_section_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `class_section_id` (`class_section_id`);

--
-- Indexes for table `course_lessons`
--
ALTER TABLE `course_lessons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lesson_uuid` (`lesson_uuid`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_uuid` (`module_uuid`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `course_structure_types`
--
ALTER TABLE `course_structure_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_structure_type_uuid` (`course_structure_type_uuid`);

--
-- Indexes for table `course_types`
--
ALTER TABLE `course_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_type_uuid` (`course_type_uuid`);

--
-- Indexes for table `course_video_links`
--
ALTER TABLE `course_video_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_uuid` (`video_uuid`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `difficulty_levels`
--
ALTER TABLE `difficulty_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `difficulty_level_uuid` (`difficulty_level_uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gender_uuid` (`gender_uuid`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grade_uuid` (`grade_uuid`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `lesson_resources`
--
ALTER TABLE `lesson_resources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `resource_uuid` (`resource_uuid`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notifications_uuid` (`notifications_uuid`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `notification_class_id_foreign_idx` (`class_id`),
  ADD KEY `notification_class_section_id_foreign_idx` (`class_section_id`),
  ADD KEY `notification_notification_target_type_id_foreign_idx` (`notification_target_type_id`);

--
-- Indexes for table `notification_target_type`
--
ALTER TABLE `notification_target_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_target_type_uuid` (`notification_target_type_uuid`),
  ADD UNIQUE KEY `target_type` (`target_type`);

--
-- Indexes for table `notification_type`
--
ALTER TABLE `notification_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_type_uuid` (`notification_type_uuid`),
  ADD UNIQUE KEY `notification_type` (`notification_type`);

--
-- Indexes for table `notification_user_map`
--
ALTER TABLE `notification_user_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_id` (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `progress_status`
--
ALTER TABLE `progress_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status_uuid` (`status_uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_uuid` (`role_uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_uuid` (`school_uuid`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `school_subject`
--
ALTER TABLE `school_subject`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_subject_uuid` (`school_subject_uuid`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `stream_id` (`stream_id`);

--
-- Indexes for table `school_subject_stream_links`
--
ALTER TABLE `school_subject_stream_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_subject_stream_link_uuid` (`school_subject_stream_link_uuid`),
  ADD KEY `school_subject_id` (`school_subject_id`),
  ADD KEY `stream_id` (`stream_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skill_uuid` (`skill_uuid`),
  ADD KEY `category` (`category`),
  ADD KEY `difficulty_level_id` (`difficulty_level_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `stream`
--
ALTER TABLE `stream`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stream_uuid` (`stream_uuid`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_uuid` (`student_uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_section_id` (`class_section_id`),
  ADD KEY `gender_id` (`gender_id`);

--
-- Indexes for table `student_assessment_result`
--
ALTER TABLE `student_assessment_result`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_assessment_result_uuid` (`student_assessment_result_uuid`),
  ADD KEY `assessment_id` (`assessment_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `student_assessment_result_grade_id_foreign_idx` (`grade_id`);

--
-- Indexes for table `student_class_section_history`
--
ALTER TABLE `student_class_section_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `prev_accademic_year_id` (`prev_accademic_year_id`),
  ADD KEY `prev_section_id` (`prev_section_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subject_uuid` (`subject_uuid`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sub_category_uuid` (`sub_category_uuid`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `syllabus`
--
ALTER TABLE `syllabus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `syllabus_uuid` (`syllabus_uuid`),
  ADD KEY `accademic_year_id` (`accademic_year_id`),
  ADD KEY `school_subject_id` (`school_subject_id`),
  ADD KEY `syllabus_created_by_foreign_idx` (`created_by`);

--
-- Indexes for table `syllabus_chapter`
--
ALTER TABLE `syllabus_chapter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `syllabus_chapter_uuid` (`syllabus_chapter_uuid`),
  ADD KEY `syllabus_id` (`syllabus_id`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `syllabus_chapter_resource`
--
ALTER TABLE `syllabus_chapter_resource`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `syllabus_chapter_resource_uuid` (`syllabus_chapter_resource_uuid`),
  ADD KEY `syllabus_chapter_id` (`syllabus_chapter_id`),
  ADD KEY `syllabus_resource_type_id` (`syllabus_resource_type_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `syllabus_resource_type`
--
ALTER TABLE `syllabus_resource_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `syllabus_resource_type_uuid` (`syllabus_resource_type_uuid`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_uuid` (`teacher_uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `caste_category_id` (`caste_category_id`);

--
-- Indexes for table `teacher_class_map`
--
ALTER TABLE `teacher_class_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accademic_year_id` (`accademic_year_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `class_section_id` (`class_section_id`);

--
-- Indexes for table `teacher_content_report`
--
ALTER TABLE `teacher_content_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accademic_year_id` (`accademic_year_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `class_section_id` (`class_section_id`),
  ADD KEY `syllabus_id` (`syllabus_id`),
  ADD KEY `syllabus_chapter_id` (`syllabus_chapter_id`),
  ADD KEY `syllabus_resource_type_id` (`syllabus_resource_type_id`);

--
-- Indexes for table `teacher_qualifications`
--
ALTER TABLE `teacher_qualifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teachers_id` (`teachers_id`),
  ADD KEY `qualification_id` (`qualification_id`);

--
-- Indexes for table `teacher_subject_map`
--
ALTER TABLE `teacher_subject_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_class_map_id` (`teacher_class_map_id`),
  ADD KEY `school_subject_id` (`school_subject_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_uuid` (`user_uuid`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_course_enrollments`
--
ALTER TABLE `user_course_enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_course_enrollment_uuid` (`user_course_enrollment_uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `progress_status_id` (`progress_status_id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_skill_uuid` (`user_skill_uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `status_id` (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accademic_year`
--
ALTER TABLE `accademic_year`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `assessment`
--
ALTER TABLE `assessment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `assessment_class_section_link`
--
ALTER TABLE `assessment_class_section_link`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `assessment_question`
--
ALTER TABLE `assessment_question`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `assessment_question_option`
--
ALTER TABLE `assessment_question_option`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `assessment_question_type`
--
ALTER TABLE `assessment_question_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assessment_student_answer`
--
ALTER TABLE `assessment_student_answer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `assessment_type`
--
ALTER TABLE `assessment_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `caste_categories`
--
ALTER TABLE `caste_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chapter`
--
ALTER TABLE `chapter`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=680;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `class_section`
--
ALTER TABLE `class_section`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `course_additional_documents`
--
ALTER TABLE `course_additional_documents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_class_section_link`
--
ALTER TABLE `course_class_section_link`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_lessons`
--
ALTER TABLE `course_lessons`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `course_modules`
--
ALTER TABLE `course_modules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `course_structure_types`
--
ALTER TABLE `course_structure_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_types`
--
ALTER TABLE `course_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_video_links`
--
ALTER TABLE `course_video_links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `difficulty_levels`
--
ALTER TABLE `difficulty_levels`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lesson_resources`
--
ALTER TABLE `lesson_resources`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_target_type`
--
ALTER TABLE `notification_target_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `notification_type`
--
ALTER TABLE `notification_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `notification_user_map`
--
ALTER TABLE `notification_user_map`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `progress_status`
--
ALTER TABLE `progress_status`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `qualifications`
--
ALTER TABLE `qualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school_subject`
--
ALTER TABLE `school_subject`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `school_subject_stream_links`
--
ALTER TABLE `school_subject_stream_links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `stream`
--
ALTER TABLE `stream`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_assessment_result`
--
ALTER TABLE `student_assessment_result`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_class_section_history`
--
ALTER TABLE `student_class_section_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `syllabus`
--
ALTER TABLE `syllabus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `syllabus_chapter`
--
ALTER TABLE `syllabus_chapter`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `syllabus_chapter_resource`
--
ALTER TABLE `syllabus_chapter_resource`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `syllabus_resource_type`
--
ALTER TABLE `syllabus_resource_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teacher_class_map`
--
ALTER TABLE `teacher_class_map`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `teacher_content_report`
--
ALTER TABLE `teacher_content_report`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `teacher_qualifications`
--
ALTER TABLE `teacher_qualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teacher_subject_map`
--
ALTER TABLE `teacher_subject_map`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_course_enrollments`
--
ALTER TABLE `user_course_enrollments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_permissions`
--
ALTER TABLE `user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT for table `user_skills`
--
ALTER TABLE `user_skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `assessment_added_by_foreign_idx` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `assessment_course_id_foreign_idx` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_1` FOREIGN KEY (`assessment_type_id`) REFERENCES `assessment_type` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_2` FOREIGN KEY (`school_subject_id`) REFERENCES `school_subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_4` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessment_class_section_link`
--
ALTER TABLE `assessment_class_section_link`
  ADD CONSTRAINT `assessment_class_section_link_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_class_section_link_ibfk_2` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessment_question`
--
ALTER TABLE `assessment_question`
  ADD CONSTRAINT `assessment_question_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_question_ibfk_2` FOREIGN KEY (`assessment_question_type_id`) REFERENCES `assessment_question_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessment_question_option`
--
ALTER TABLE `assessment_question_option`
  ADD CONSTRAINT `assessment_question_option_ibfk_1` FOREIGN KEY (`assessment_question_id`) REFERENCES `assessment_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assessment_student_answer`
--
ALTER TABLE `assessment_student_answer`
  ADD CONSTRAINT `assessment_student_answer_ibfk_1` FOREIGN KEY (`student_assessment_result_id`) REFERENCES `student_assessment_result` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessment_student_answer_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `assessment_question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_section`
--
ALTER TABLE `class_section`
  ADD CONSTRAINT `class_section_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class_section_ibfk_2` FOREIGN KEY (`stream_id`) REFERENCES `stream` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_5` FOREIGN KEY (`difficulty_level_id`) REFERENCES `difficulty_levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_6` FOREIGN KEY (`course_type_id`) REFERENCES `course_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_7` FOREIGN KEY (`course_structure_type_id`) REFERENCES `course_structure_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `course_additional_documents`
--
ALTER TABLE `course_additional_documents`
  ADD CONSTRAINT `course_additional_documents_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_class_section_link`
--
ALTER TABLE `course_class_section_link`
  ADD CONSTRAINT `course_class_section_link_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_class_section_link_ibfk_2` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_lessons`
--
ALTER TABLE `course_lessons`
  ADD CONSTRAINT `course_lessons_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD CONSTRAINT `course_modules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_video_links`
--
ALTER TABLE `course_video_links`
  ADD CONSTRAINT `course_video_links_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lesson_resources`
--
ALTER TABLE `lesson_resources`
  ADD CONSTRAINT `lesson_resources_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `course_lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_class_id_foreign_idx` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_class_section_id_foreign_idx` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_notification_target_type_id_foreign_idx` FOREIGN KEY (`notification_target_type_id`) REFERENCES `notification_target_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notification_user_map`
--
ALTER TABLE `notification_user_map`
  ADD CONSTRAINT `notification_user_map_ibfk_1` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_user_map_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schools_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schools_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `school_subject`
--
ALTER TABLE `school_subject`
  ADD CONSTRAINT `school_subject_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `school_subject_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `school_subject_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `school_subject_ibfk_4` FOREIGN KEY (`stream_id`) REFERENCES `stream` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `school_subject_stream_links`
--
ALTER TABLE `school_subject_stream_links`
  ADD CONSTRAINT `school_subject_stream_links_ibfk_1` FOREIGN KEY (`school_subject_id`) REFERENCES `school_subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `school_subject_stream_links_ibfk_2` FOREIGN KEY (`stream_id`) REFERENCES `stream` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `skills_ibfk_2` FOREIGN KEY (`difficulty_level_id`) REFERENCES `difficulty_levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `skills_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `states`
--
ALTER TABLE `states`
  ADD CONSTRAINT `states_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stream`
--
ALTER TABLE `stream`
  ADD CONSTRAINT `stream_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_assessment_result`
--
ALTER TABLE `student_assessment_result`
  ADD CONSTRAINT `student_assessment_result_grade_id_foreign_idx` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_assessment_result_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_assessment_result_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_class_section_history`
--
ALTER TABLE `student_class_section_history`
  ADD CONSTRAINT `student_class_section_history_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_class_section_history_ibfk_2` FOREIGN KEY (`prev_accademic_year_id`) REFERENCES `accademic_year` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_class_section_history_ibfk_3` FOREIGN KEY (`prev_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `syllabus`
--
ALTER TABLE `syllabus`
  ADD CONSTRAINT `syllabus_created_by_foreign_idx` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_ibfk_1` FOREIGN KEY (`accademic_year_id`) REFERENCES `accademic_year` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_ibfk_2` FOREIGN KEY (`school_subject_id`) REFERENCES `school_subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `syllabus_chapter`
--
ALTER TABLE `syllabus_chapter`
  ADD CONSTRAINT `syllabus_chapter_ibfk_1` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_chapter_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_chapter_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `syllabus_chapter_resource`
--
ALTER TABLE `syllabus_chapter_resource`
  ADD CONSTRAINT `syllabus_chapter_resource_ibfk_1` FOREIGN KEY (`syllabus_chapter_id`) REFERENCES `syllabus_chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_chapter_resource_ibfk_2` FOREIGN KEY (`syllabus_resource_type_id`) REFERENCES `syllabus_resource_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `syllabus_chapter_resource_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_3` FOREIGN KEY (`caste_category_id`) REFERENCES `caste_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_class_map`
--
ALTER TABLE `teacher_class_map`
  ADD CONSTRAINT `teacher_class_map_ibfk_1` FOREIGN KEY (`accademic_year_id`) REFERENCES `accademic_year` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_class_map_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_class_map_ibfk_3` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_content_report`
--
ALTER TABLE `teacher_content_report`
  ADD CONSTRAINT `teacher_content_report_ibfk_1` FOREIGN KEY (`accademic_year_id`) REFERENCES `accademic_year` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_4` FOREIGN KEY (`class_section_id`) REFERENCES `class_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_5` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_6` FOREIGN KEY (`syllabus_chapter_id`) REFERENCES `syllabus_chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_content_report_ibfk_7` FOREIGN KEY (`syllabus_resource_type_id`) REFERENCES `syllabus_resource_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_qualifications`
--
ALTER TABLE `teacher_qualifications`
  ADD CONSTRAINT `teacher_qualifications_ibfk_1` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_qualifications_ibfk_2` FOREIGN KEY (`qualification_id`) REFERENCES `qualifications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_subject_map`
--
ALTER TABLE `teacher_subject_map`
  ADD CONSTRAINT `teacher_subject_map_ibfk_1` FOREIGN KEY (`teacher_class_map_id`) REFERENCES `teacher_class_map` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_subject_map_ibfk_2` FOREIGN KEY (`school_subject_id`) REFERENCES `school_subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_course_enrollments`
--
ALTER TABLE `user_course_enrollments`
  ADD CONSTRAINT `user_course_enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_course_enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_course_enrollments_ibfk_3` FOREIGN KEY (`progress_status_id`) REFERENCES `progress_status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_login`
--
ALTER TABLE `user_login`
  ADD CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_skills_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `progress_status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
