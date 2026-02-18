package com.board.controller;

import com.board.entity.Image;
import com.board.repository.ImageRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.util.LinkedList;

@RestController
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Value("${ai.python.base-path:../Capstone-main-ai}")
    private String aiBasePath;

    @Value("${ai.image.upload-path:../uploads}")
    private String uploadPath;

    @PostMapping("/api/images/pet")
    public ResponseEntity<String> PetImage(@RequestParam("image") MultipartFile multipartFile)
            throws IOException, InterruptedException {
        String fileName = multipartFile.getOriginalFilename();

        // 업로드 디렉토리 생성
        Path uploadDir = Paths.get(uploadPath);
        Files.createDirectories(uploadDir);

        Path path = uploadDir.resolve(fileName);
        Files.write(path, multipartFile.getBytes());

        Image image = new Image();
        image.setFileName(fileName);
        imageRepository.save(image);

        // 이미지 파일 경로
        String imagePath = path.toAbsolutePath().toString();

        // 파이썬 스크립트 경로
        String pythonScriptPath = Paths.get(aiBasePath, "Kind", "pet.py").toAbsolutePath().toString();

        String result = "";
        // 파이썬 실행 명령 (Windows에서는 python, Linux에서는 python3)
        String pythonCmd = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";
        String[] cmd = { pythonCmd, pythonScriptPath, imagePath };

        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.directory(Paths.get(aiBasePath, "Kind").toAbsolutePath().toFile());
        Process process = pb.start();

        BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
        BufferedReader err = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        StringBuilder output = new StringBuilder();
        StringBuilder errorMessage = new StringBuilder();

        String lastLine = null;
        while ((line = in.readLine()) != null) {
            output.append(line).append("\n");
            lastLine = line;
        }

        result = lastLine;

        while ((line = err.readLine()) != null) {
            errorMessage.append(line).append("\n");
        }

        int exitCode = process.waitFor();

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body(result);
    }

    @PostMapping("/api/images/skin")
    public ResponseEntity<String> SkinImage(@RequestParam("image") MultipartFile multipartFile)
            throws IOException, InterruptedException {
        String fileName = multipartFile.getOriginalFilename();

        // 업로드 디렉토리 생성
        Path uploadDir = Paths.get(uploadPath);
        Files.createDirectories(uploadDir);

        Path path = uploadDir.resolve(fileName);
        Files.write(path, multipartFile.getBytes());

        Image image = new Image();
        image.setFileName(fileName);
        imageRepository.save(image);

        // 이미지 파일 경로
        String imagePath = path.toAbsolutePath().toString();

        // 파이썬 스크립트 경로
        String pythonScriptPath = Paths.get(aiBasePath, "SkinDisease.py").toAbsolutePath().toString();

        String result = "";
        String pythonCmd = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";
        String[] cmd = { pythonCmd, pythonScriptPath, imagePath };

        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.directory(Paths.get(aiBasePath).toAbsolutePath().toFile());
        Process process = pb.start();

        BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
        BufferedReader err = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        StringBuilder output = new StringBuilder();
        StringBuilder errorMessage = new StringBuilder();

        String lastLine = null;
        while ((line = in.readLine()) != null) {
            output.append(line).append("\n");
            lastLine = line;
        }

        result = lastLine;

        while ((line = err.readLine()) != null) {
            errorMessage.append(line).append("\n");
        }

        int exitCode = process.waitFor();

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body(result);
    }

    @GetMapping("/api/images/report")
    public ResponseEntity<String> report() throws IOException, InterruptedException {
        // 파이썬 스크립트 경로
        String pythonScriptPath = Paths.get(aiBasePath, "news.py").toAbsolutePath().toString();

        String pythonCmd = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";
        String[] cmd = { pythonCmd, pythonScriptPath };

        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.directory(Paths.get(aiBasePath).toAbsolutePath().toFile());
        Process process = pb.start();

        BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
        BufferedReader err = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        StringBuilder output = new StringBuilder();
        StringBuilder errorMessage = new StringBuilder();

        LinkedList<String> lastLines = new LinkedList<>();
        while ((line = in.readLine()) != null) {
            if (lastLines.size() == 3) {
                lastLines.removeFirst();
            }
            lastLines.addLast(line);
        }

        while ((line = err.readLine()) != null) {
            errorMessage.append(line).append("\n");
        }

        int exitCode = process.waitFor();

        StringBuilder resultBuilder = new StringBuilder();
        for (String lastLine : lastLines) {
            resultBuilder.append(lastLine).append("\n");
        }
        String result = resultBuilder.toString().trim();

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body(result);
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex + 1).toLowerCase();
        } else {
            return null;
        }
    }

    private MediaType getMediaTypeForImageExtension(String extension) {
        switch (extension) {
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            default:
                return MediaType.IMAGE_JPEG;
        }
    }
}