"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Code, Palette, Zap, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const developers = [
  {
    name: "Rabin Chudali",
    role: "Lead Developer & API Manager",
    description: "Full-stack architect specializing in AI integration and backend systems",
    skills: ["Next.js", "Graphics Designing", "API Design", "Google Gemini", "TypeScript"],
    avatar: "RC",
    image: "https://i.ibb.co/b5D8b3JS/d939a9c5-3e97-4d2f-b299-f202608f3d6d.png",
    gradient: "from-purple-600 to-blue-600",
    icon: Code,
    social: {
      github: "https://github.com/TechnophileCracker",
      linkedin: "https://www.linkedin.com/in/rabin-chudali-9600b934b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "rabinchudali07@gmail.com",
    },
  },
  {
    name: "Amrit Bhandari",
    role: "UI/UX Designer & Motion Expert",
    description: "Creative designer focused on user experience and beautiful animations",
    skills: ["Figma", "Framer Motion", "Tailwind CSS", "User Research", "Prototyping"],
    avatar: "AB",
    image: "https://i.ibb.co/S4hr1mdd/Screenshot-20250607-130651.png",
    gradient: "from-pink-600 to-orange-600",
    icon: Palette,
    social: {
      github: "#",
      linkedin: "#",
      email: "amritbhandari969@gmail.com",
    },
  },
]

export default function DeveloperCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const badgeVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700 shadow-lg mb-6"
          >
            <Star className="h-4 w-4 text-yellow-500" />
            Meet Our Amazing Team
            <Star className="h-4 w-4 text-yellow-500" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Minds Behind{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              SoulSync
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate developers and designers working together to revolutionize mental wellness through technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {developers.map((dev, index) => (
            <motion.div key={dev.name} variants={cardVariants} whileHover={{ y: -10 }} className="group">
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover="hover"
                      variants={imageVariants}
                      className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0"
                    >
                      <Image
                        src={dev.image || "/placeholder.svg"}
                        alt={`${dev.name} - ${dev.role}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${dev.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        whileHover={{ opacity: 0.2 }}
                      />
                      {/* Professional badge overlay */}
                      <div className="absolute bottom-1 right-1">
                        <motion.div
                          whileHover="hover"
                          variants={iconVariants}
                          className={`w-6 h-6 bg-gradient-to-r ${dev.gradient} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <dev.icon className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
                        whileHover={{
                          backgroundImage: `linear-gradient(to right, ${dev.gradient.split(" ")[1]}, ${dev.gradient.split(" ")[3]})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {dev.name}
                      </motion.h3>
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div whileHover="hover" variants={iconVariants}>
                          <dev.icon
                            className={`h-5 w-5 bg-gradient-to-r ${dev.gradient} bg-clip-text text-transparent`}
                          />
                        </motion.div>
                        <p className={`font-semibold bg-gradient-to-r ${dev.gradient} bg-clip-text text-transparent`}>
                          {dev.role}
                        </p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{dev.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          variants={badgeVariants}
                          whileHover="hover"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          <Badge
                            className={`bg-gradient-to-r ${dev.gradient} text-white hover:shadow-lg transition-all duration-300 cursor-default`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <motion.a
                      href={dev.social.github}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={dev.social.linkedin}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${dev.social.email}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      <Mail className="h-5 w-5" />
                    </motion.a>
                  </div>

                  {/* Professional Status Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Available for collaboration</span>
                  </motion.div>

                  {/* Decorative Element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dev.gradient} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                2+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Passion Driven</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Dedicated Support</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-cyan-500/20 backdrop-blur-md">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Want to collaborate with our team?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're always excited to work on innovative projects that make a positive impact on mental wellness and
                technology.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="mailto:nohorasinchan888@gmail.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </a>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
