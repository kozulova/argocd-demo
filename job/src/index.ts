console.log("Job started!");

// Simulate some work (~3 minutes)
let counter = 0;
const interval = setInterval(() => {
  counter += 10;
  console.log(`Working... ${counter} seconds elapsed`);
  if (counter >= 180) {
    // 180 seconds = 3 minutes
    console.log("Job finished!");
    clearInterval(interval);
    process.exit(0);
  }
}, 10000); // every 10 seconds
