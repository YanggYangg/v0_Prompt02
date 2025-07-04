"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Clock,
  User,
  Flag,
  Send,
  Bold,
  Italic,
  Type,
  Heading1,
  Heading2,
  Link,
  Paperclip,
  Plus,
} from "lucide-react"
import { format } from "date-fns"

type TaskStatus = "NEW" | "IN PROGRESS" | "DONE"
type Priority = "HIGH" | "MEDIUM" | "LOW"

const statusProgressMap: Record<TaskStatus, number> = {
  NEW: 0,
  "IN PROGRESS": 50,
  DONE: 100,
}

const priorityColors: Record<Priority, string> = {
  HIGH: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  MEDIUM: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  LOW: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
}

const statusColors: Record<TaskStatus, string> = {
  NEW: "bg-gradient-to-r from-slate-500 to-slate-600",
  "IN PROGRESS": "bg-gradient-to-r from-blue-500 to-indigo-600",
  DONE: "bg-gradient-to-r from-emerald-500 to-green-600",
}

const assignees = [
  { id: "1", name: "John Smith", email: "john@example.com", avatar: "JS" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", avatar: "SJ" },
  { id: "3", name: "Mike Chen", email: "mike@example.com", avatar: "MC" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", avatar: "ED" },
  { id: "5", name: "Alex Wilson", email: "alex@example.com", avatar: "AW" },
]

export default function TaskDetails() {
  const [taskTitle, setTaskTitle] = useState("Implement user authentication system")
  const [description, setDescription] = useState(
    "Design and implement a comprehensive user authentication system with login, registration, password reset, and session management features.",
  )
  const [status, setStatus] = useState<TaskStatus>("IN PROGRESS")
  const [assignee, setAssignee] = useState("2")
  const [priority, setPriority] = useState<Priority>("HIGH")
  const [dueDate, setDueDate] = useState<Date>()
  const [estimatedTime, setEstimatedTime] = useState("8")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const progress = statusProgressMap[status]
  const selectedAssignee = assignees.find((a) => a.id === assignee)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = description.substring(start, end)
    const newText = description.substring(0, start) + before + selectedText + after + description.substring(end)

    setDescription(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatText = (type: string) => {
    switch (type) {
      case "bold":
        insertText("**", "**")
        break
      case "italic":
        insertText("*", "*")
        break
      case "h1":
        insertText("# ")
        break
      case "h2":
        insertText("## ")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Title */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="text-3xl font-bold border-none p-0 focus-visible:ring-0 bg-transparent text-slate-800 placeholder:text-slate-400"
                  placeholder="Task title..."
                />
              </CardHeader>
            </Card>

            {/* Description with Rich Text Editor */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <Type className="w-5 h-5 mr-2 text-indigo-600" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Formatting Toolbar */}
                <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("bold")}
                    className="h-8 w-8 p-0 hover:bg-slate-200"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("italic")}
                    className="h-8 w-8 p-0 hover:bg-slate-200"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-slate-300" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("h1")}
                    className="h-8 w-8 p-0 hover:bg-slate-200"
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("h2")}
                    className="h-8 w-8 p-0 hover:bg-slate-200"
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add task description..."
                  className="min-h-[200px] resize-none border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <Tabs defaultValue="links" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-slate-50/50">
                    <TabsTrigger
                      value="links"
                      className="rounded-none data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600"
                    >
                      <Link className="w-4 h-4 mr-2" />
                      Links
                    </TabsTrigger>
                    <TabsTrigger
                      value="attachments"
                      className="rounded-none data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attachments
                    </TabsTrigger>
                    <TabsTrigger
                      value="subtasks"
                      className="rounded-none data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subtasks
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="links" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">Related Links</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                        >
                          Add Link
                        </Button>
                      </div>
                      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                        No links added yet. Click "Add Link" to get started.
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="attachments" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">Attachments</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                        >
                          Upload File
                        </Button>
                      </div>
                      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                        No attachments yet. Click "Upload File" to add files.
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="subtasks" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">Subtasks</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                        >
                          Add Subtask
                        </Button>
                      </div>
                      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                        No subtasks created yet. Click "Add Subtask" to break down this task.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Release Button */}
            <div className="flex justify-end">
              <Button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                <Send className="w-4 h-4 mr-2" />
                Release Task
              </Button>
            </div>
          </div>

          {/* Right Column - Task Details */}
          <div className="space-y-6">
            {/* Status & Progress */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Status & Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                    Status
                  </Label>
                  <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                    <SelectTrigger className="border-slate-200 focus:border-indigo-300 focus:ring-indigo-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">NEW</SelectItem>
                      <SelectItem value="IN PROGRESS">IN PROGRESS</SelectItem>
                      <SelectItem value="DONE">DONE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={`${statusColors[status]} text-white px-3 py-1 text-xs font-medium`}>{status}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Progress</Label>
                    <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full h-3 bg-slate-100" />
                </div>
              </CardContent>
            </Card>

            {/* Assignee */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  Assignee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger className="border-slate-200 focus:border-indigo-300 focus:ring-indigo-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assignees.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {person.avatar}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{person.name}</span>
                            <span className="text-xs text-slate-500">{person.email}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAssignee && (
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedAssignee.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{selectedAssignee.name}</div>
                        <div className="text-sm text-slate-600">{selectedAssignee.email}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Priority */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <Flag className="w-5 h-5 mr-2 text-indigo-600" />
                  Priority
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                  <SelectTrigger className="border-slate-200 focus:border-indigo-300 focus:ring-indigo-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="LOW">LOW</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 rounded-lg">
                  <Badge className={`${priorityColors[priority]} text-white px-4 py-2 text-sm font-semibold shadow-md`}>
                    {priority} PRIORITY
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Due Date & Time Estimate */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white border-slate-200 hover:bg-slate-50 focus:border-indigo-300 focus:ring-indigo-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600" />
                        {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="estimated-time" className="text-sm font-medium text-slate-700">
                    Estimated Time (hours)
                  </Label>
                  <Input
                    id="estimated-time"
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="Enter hours"
                    className="border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
