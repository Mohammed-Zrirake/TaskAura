//package com.taskaura.config;
//
//import com.github.javafaker.Faker;
//import com.taskaura.entity.Project;
//import com.taskaura.entity.Task;
//import com.taskaura.entity.User;
//import com.taskaura.repository.ProjectRepository;
//import com.taskaura.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.time.ZoneId;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Locale;
//import java.util.concurrent.TimeUnit;
//
//@Component
//@RequiredArgsConstructor
//public class DataSeeder implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final ProjectRepository projectRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) throws Exception {
//        if (userRepository.count() == 0) {
//            System.out.println("Database is empty. Seeding realistic data...");
//            seedData();
//            System.out.println("Database seeding complete.");
//        } else {
//            System.out.println("Database already contains data. Skipping seed.");
//        }
//    }
//
//    private void seedData() {
//        Faker faker = new Faker(new Locale("en-US"));
//
//        // Create lists for more realistic project/task names
//        List<String> projectPrefixes = Arrays.asList("Launch", "Develop", "Redesign", "Implement", "Analyze", "Optimize");
//        List<String> projectSuffixes = Arrays.asList("Platform", "Mobile App", "Marketing Campaign", "Analytics Dashboard", "API", "Onboarding Flow");
//        List<String> taskVerbs = Arrays.asList("Implement", "Test", "Review", "Design", "Deploy", "Research", "Finalize");
//        List<String> taskNouns = Arrays.asList("user authentication", "database schema", "the landing page", "performance metrics", "the API documentation", "user feedback");
//
//        // --- 1. CREATE 10 USERS ---
//        List<User> users = new ArrayList<>();
//        for (int i = 0; i < 10; i++) {
//            String firstName = faker.name().firstName();
//            String lastName = faker.name().lastName();
//            String email = String.format("%s.%s@taskaura.com", firstName.toLowerCase(), lastName.toLowerCase());
//
//            // Ensure email is unique before creating user
//            if (userRepository.findByEmail(email).isEmpty()) {
//                User user = new User();
//                user.setUsername(firstName + " " + lastName);
//                user.setEmail(email);
//                user.setPassword(passwordEncoder.encode("password")); // Same password for all test users
//                users.add(user);
//            }
//        }
//        userRepository.saveAll(users);
//        System.out.println("Seeded " + users.size() + " users.");
//
//        // --- 2. FOR EACH USER, CREATE 30 PROJECTS WITH 6 TASKS ---
//        for (User user : users) {
//            for (int i = 0; i < 30; i++) {
//                Project project = new Project();
//                project.setUser(user);
//
//                // Realistic Project Title
//                String title = String.format("%s %s %s",
//                        faker.company().buzzword(),
//                        projectPrefixes.get(faker.random().nextInt(projectPrefixes.size())),
//                        projectSuffixes.get(faker.random().nextInt(projectSuffixes.size())));
//                project.setTitle(title);
//                project.setDescription(faker.lorem().paragraph(2));
//
//                List<Task> tasks = new ArrayList<>();
//                for (int j = 0; j < 6; j++) {
//                    Task task = new Task();
//                    task.setProject(project);
//
//                    // Realistic Task Title
//                    task.setTitle(String.format("%s %s",
//                            taskVerbs.get(faker.random().nextInt(taskVerbs.size())),
//                            taskNouns.get(faker.random().nextInt(taskNouns.size()))));
//
//                    task.setDescription(faker.lorem().sentence());
//                    task.setDueDate(faker.date().future(60, TimeUnit.DAYS).toInstant()
//                            .atZone(ZoneId.systemDefault()).toLocalDate());
//
//                    // Bias completion: ~70% of tasks will be completed
//                    task.setCompleted(faker.random().nextDouble() > 0.3);
//                    tasks.add(task);
//                }
//                project.setTasks(tasks);
//                projectRepository.save(project);
//            }
//        }
//        System.out.println("Seeded 300 projects and 1800 tasks.");
//    }
//}