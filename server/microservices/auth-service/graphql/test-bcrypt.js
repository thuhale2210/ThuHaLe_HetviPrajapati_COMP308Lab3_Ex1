import bcrypt from 'bcrypt';

// Use the EXACT stored hash from MongoDB
const storedHash = "$2b$10$ZQwy691nXA9letPWYN/GfuHhmus7l63OdmA8xtfnZxgFsxtqJ1jPC";
const enteredPassword = "password123";

(async () => {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    console.log("🔍 bcrypt.compare() Test Result:", match ? "✅ MATCH" : "❌ NO MATCH");
})();
