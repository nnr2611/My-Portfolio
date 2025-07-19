"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'


emailjs.init('bhi0ydvKNR5nz3gAj'); // Initialize EmailJS with your public key
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    emailjs
      .send(
        process.env.SERVICE_ID!,
        process.env.TEMPLATE_ID!,
        formData,
        process.env.PUBLIC_KEY!
      )
      .then(
        () => {
          alert("Thank you! Your message was sent.")
          setFormData({ name: "", email: "", subject: "", message: "" })
        },
        (error) => {
          console.error("FAILED...", error)
          alert("Oops! Something went wrong.")
        }
      )

  }

  return (
    <motion.section
      id="section"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <section id="contact" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:nithishragav2611@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      nithishragav2611@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+15873979364" className="text-muted-foreground hover:text-primary transition-colors">
                      +15873979364
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Edmonton, AB, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </motion.section>
  )
}
