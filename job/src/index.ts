console.log("Job started!");

// Simulate some work
setTimeout(() => {
  console.log("Job finished!");
  process.exit(0);
}, 5000);
