const { generateAccessToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");
const prisma = require("../config/prisma");

class AuthentificationController {
  async login(req, res) {
    try {
        const body = req.body;
        const user = await prisma.user.findUnique({
            where: {
            email: body.email,
            },
        });
        if (!user) return res.status(404).json({ message: "User not found" });  

        const isPasswordMatch = await comparePassword(body.password, user.password);

        if (!isPasswordMatch) return res.status(403).json({ message: "Invalid password" });

        const token = generateAccessToken(body.email);

        
        return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getMyProfile(req, res) {
        const user = req.user;
        
  
    return res.status(200).json({ 
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt 
    });
  }
}

module.exports = new AuthentificationController();
