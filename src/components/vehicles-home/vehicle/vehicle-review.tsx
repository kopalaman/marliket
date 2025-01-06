"use client"

// components/vehicles-home/vehicle/vehicle-reviews.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  BadgeCheck,
  ChevronRight,
  PenSquare,
  Star,
  ThumbsUp,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Review {
  id: string
  user: {
    name: string
    avatar?: string
    location: string
  }
  rating: number
  date: string
  comment: string
  pros?: string[]
  cons?: string[]
  verified: boolean
  helpful: number
}

interface VehicleReviews {
  totalCount: number
  averageRating: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  reviews: Review[]
}

interface VehicleReviewsProps {
  reviews: VehicleReviews
}

export function VehicleReviews({ reviews }: VehicleReviewsProps) {
  // Calculate percentage for each rating
  const totalReviews = reviews.totalCount
  const ratingPercentages = Object.entries(reviews.ratingBreakdown)
    .map(([rating, count]) => ({
      rating: Number(rating),
      percentage: (count / totalReviews) * 100,
      count,
    }))
    .sort((a, b) => b.rating - a.rating)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customer Reviews</h2>
          <p className="text-sm text-muted-foreground">
            {reviews.totalCount} reviews
          </p>
        </div>
        <AddReviewDialog />
      </div>
      {/* Rating Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: Average Rating */}
            <div className="space-y-2 text-center md:text-left">
              <div className="text-2xl font-bold">
                {reviews.averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(reviews.averageRating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {reviews.totalCount} reviews
              </div>
            </div>

            {/* Right: Rating Breakdown */}
            <div className="space-y-2">
              {ratingPercentages.map(({ rating, percentage, count }) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="w-12 text-sm text-muted-foreground">
                    {rating} stars
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="w-12 text-sm text-muted-foreground">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={review.user.avatar} />
                      <AvatarFallback>
                        {review.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user.name}</span>
                        {review.verified && (
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{review.user.location}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Review Content */}
                <div className="space-y-3">
                  <p className="text-sm">{review.comment}</p>

                  {/* Pros & Cons */}
                  {(review.pros || review.cons) && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {review.pros && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Pros</div>
                          <ul className="space-y-1">
                            {review.pros.map((pro, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <ChevronRight className="mt-0.5 h-4 w-4 text-green-500" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Cons</div>
                          <ul className="space-y-1">
                            {review.cons.map((con, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <ChevronRight className="mt-0.5 h-4 w-4 text-red-500" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Review Footer */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful} found this helpful</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AddReviewDialog() {
  // Form validation schema
  const reviewSchema = z.object({
    rating: z.string().min(1, "Please select a rating"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    comment: z.string().min(10, "Review must be at least 10 characters"),
    pros: z.string(),
    cons: z.string(),
  })

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "",
      title: "",
      comment: "",
      pros: "",
      cons: "",
    },
  })

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log(values)
    // Handle review submission
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PenSquare className="h-4 w-4" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem
                          key={rating}
                          className="flex flex-col items-center space-y-1"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={rating.toString()}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label
                            className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-muted p-2 hover:border-primary/50 peer-data-[state=checked]:border-primary"
                            htmlFor={`rating-${rating}`}
                          >
                            <Star className="h-6 w-6 peer-data-[state=checked]:fill-primary" />
                            <span className="text-sm">{rating}</span>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this vehicle..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pros */}
            <FormField
              control={form.control}
              name="pros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pros (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like? (separate with commas)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cons */}
            <FormField
              control={form.control}
              name="cons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cons (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What could be improved? (separate with commas)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
