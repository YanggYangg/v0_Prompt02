"use client"

import { useState } from "react"
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
import { CalendarIcon, Clock, User, Flag, Send } from "lucide-react"
import { format } from "date-fns"

type TaskStatus = "NEW" | "IN PROGRESS" | "DONE"
type Priority = "HIGH" | "MEDIUM" | "LOW"

const statusProgressMap: Record<TaskStatus, number> = {
  NEW: 0,
  "IN PROGRESS": 50,
  DONE: 100,
}

const priorityColors: Record<Priority, string> = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-yellow-500",
  LOW: "bg-green-500",
}

const assignees = [
  { id: "1", name: "John Smith", email: "john@example.com" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com" },
  { id: "3", name: "Mike Chen", email: "mike@example.com" },
  { id: "4", name: "Emily Davis", email: "emily@example.com" },
  { id: "5", name: "Alex Wilson", email: "alex@example.com" },
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

  const progress = statusProgressMap[status]
  const selectedAssignee = assignees.find((a) => a.id === assignee)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Title */}
            <Card>
              <CardHeader>
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="text-2xl font-bold border-none p-0 focus-visible:ring-0 bg-transparent"
                  placeholder="Task title..."
                />
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add task description..."
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="links" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                    <TabsTrigger value="links" className="rounded-none">
                      Links
                    </TabsTrigger>
                    <TabsTrigger value="attachments" className="rounded-none">
                      Attachments
                    </TabsTrigger>
                    <TabsTrigger value="subtasks" className="rounded-none">
                      Add Subtasks
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="links" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Related Links</h3>
                        <Button variant="outline" size="sm">
                          Add Link
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        No links added yet. Click "Add Link" to get started.
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="attachments" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Attachments</h3>
                        <Button variant="outline" size="sm">
                          Upload File
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        No attachments yet. Click "Upload File" to add files.
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="subtasks" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Subtasks</h3>
                        <Button variant="outline" size="sm">
                          Add Subtask
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        No subtasks created yet. Click "Add Subtask" to break down this task.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Release Button */}
            <div className="flex justify-end">
              <Button className="px-8">
                <Send className="w-4 h-4 mr-2" />
                Release Task
              </Button>
            </div>
          </div>

          {/* Right Column - Task Details */}
          <div className="space-y-6">
            {/* Status & Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status & Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">NEW</SelectItem>
                      <SelectItem value="IN PROGRESS">IN PROGRESS</SelectItem>
                      <SelectItem value="DONE">DONE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Progress</Label>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Assignee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Assignee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assignees.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        <div className="flex flex-col">
                          <span>{person.name}</span>
                          <span className="text-xs text-muted-foreground">{person.email}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAssignee && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {selectedAssignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{selectedAssignee.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedAssignee.email}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Priority */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Flag className="w-4 h-4 mr-2" />
                  Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="LOW">LOW</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-3">
                  <Badge className={`${priorityColors[priority]} text-white`}>{priority} PRIORITY</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Due Date & Time Estimate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated-time">Estimated Time (hours)</Label>
                  <Input
                    id="estimated-time"
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="Enter hours"
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
