'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, CheckCircle2, Building2, User, Mail, Phone, Hash, FileText } from 'lucide-react'
import { mockPolyclinics } from '@/lib/mockData'

export default function PolyclinicFeedbackView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    echsCode: '',
    phone: '',
    polyclinicId: '',
    feedback: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.echsCode.trim()) {
      newErrors.echsCode = 'ECHS Code is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.polyclinicId) {
      newErrors.polyclinicId = 'Please select a polyclinic'
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required'
    } else if (formData.feedback.trim().length < 10) {
      newErrors.feedback = 'Feedback must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate API call
    setTimeout(() => {
      console.log('Feedback submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          echsCode: '',
          phone: '',
          polyclinicId: '',
          feedback: ''
        })
        setSubmitSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const selectedPolyclinic = mockPolyclinics.find(p => p.id === formData.polyclinicId)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Polyclinic Feedback</h1>
          <p className="text-slate-600 mt-2">Share your experience and help us improve our services</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <MessageSquare className="h-3 w-3 mr-1" />
            Public Feedback Form
          </Badge>
        </div>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-900 mb-1">Feedback Submitted Successfully!</h3>
                <p className="text-sm text-emerald-700">
                  Thank you for your feedback. We appreciate your input and will use it to improve our services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-xl font-semibold text-slate-900">Submit Your Feedback</CardTitle>
              <CardDescription>
                Please fill in all the details to submit your feedback about a specific polyclinic
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <User className="h-4 w-4 text-slate-600" />
                    <h3 className="font-semibold text-slate-900">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`pl-10 ${errors.name ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="echsCode" className="text-slate-700 font-medium">
                        ECHS Code <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="echsCode"
                          type="text"
                          placeholder="Enter your ECHS code"
                          value={formData.echsCode}
                          onChange={(e) => handleInputChange('echsCode', e.target.value)}
                          className={`pl-10 ${errors.echsCode ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.echsCode && <p className="text-xs text-red-600">{errors.echsCode}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`pl-10 ${errors.phone ? 'border-red-300 focus:border-red-500' : ''}`}
                          maxLength={10}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Polyclinic Selection Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <Building2 className="h-4 w-4 text-slate-600" />
                    <h3 className="font-semibold text-slate-900">Polyclinic Selection</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="polyclinic" className="text-slate-700 font-medium">
                      Select Polyclinic <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.polyclinicId}
                      onValueChange={(value) => handleInputChange('polyclinicId', value)}
                    >
                      <SelectTrigger className={errors.polyclinicId ? 'border-red-300 focus:border-red-500' : ''}>
                        <SelectValue placeholder="Choose a polyclinic" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPolyclinics.map((polyclinic) => (
                          <SelectItem key={polyclinic.id} value={polyclinic.id}>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{polyclinic.name}</span>
                              <span className="text-slate-500">({polyclinic.code})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.polyclinicId && <p className="text-xs text-red-600">{errors.polyclinicId}</p>}
                  </div>

                  {selectedPolyclinic && (
                    <Card className="bg-slate-50 border border-slate-200">
                      <CardContent className="pt-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-semibold text-slate-700 min-w-20">Location:</span>
                            <span className="text-slate-600">{selectedPolyclinic.city}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-semibold text-slate-700 min-w-20">Address:</span>
                            <span className="text-slate-600">{selectedPolyclinic.address}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-semibold text-slate-700 min-w-20">OIC:</span>
                            <span className="text-slate-600">{selectedPolyclinic.inCharge}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <h3 className="font-semibold text-slate-900">Your Feedback</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-slate-700 font-medium">
                      Feedback / Comments <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Please share your experience, suggestions, or concerns regarding the polyclinic services..."
                      value={formData.feedback}
                      onChange={(e) => handleInputChange('feedback', e.target.value)}
                      className={`min-h-32 ${errors.feedback ? 'border-red-300 focus:border-red-500' : ''}`}
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center">
                      {errors.feedback && <p className="text-xs text-red-600">{errors.feedback}</p>}
                      <p className="text-xs text-slate-500 ml-auto">
                        {formData.feedback.length}/1000 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        echsCode: '',
                        phone: '',
                        polyclinicId: '',
                        feedback: ''
                      })
                      setErrors({})
                    }}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          <Card className="border border-slate-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-900">Why Your Feedback Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-800">
              <p>Your feedback helps us:</p>
              <ul className="space-y-2 ml-4 list-disc">
                <li>Improve service quality at polyclinics</li>
                <li>Address concerns promptly</li>
                <li>Recognize excellent performance</li>
                <li>Enhance veteran healthcare experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Be specific about your experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Provide constructive feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Include relevant dates if applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Maintain respectful language</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="pt-6">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> All feedback submissions are reviewed by the Regional Centre. 
                We aim to respond to serious concerns within 48 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

