import { useTheme } from "@/components/theme-provider"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        //   description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: [
            "group-[.toaster]:bg-green-500/10",
            "group-[.toaster]:text-green-500",
            "group-[.toaster]:border-green-500/40",
            "dark:group-[.toaster]:bg-green-500/10",
            "dark:group-[.toaster]:text-green-400",
            "group-[.toast]:text-green-600 dark:group-[.toast]:text-green-200",
            "[&_.description]:text-green-600/80 dark:[&_.description]:text-green-300/80",
            "group-[.toast]:border-green-500/20",
          ].join(" "),
          error: [
            "group-[.toaster]:bg-red-500/10",
            "group-[.toaster]:text-red-500",
            "group-[.toaster]:border-red-500/40",
            "dark:group-[.toaster]:bg-red-500/10",
            "dark:group-[.toaster]:text-red-400",
            "group-[.toast]:text-red-600 dark:group-[.toast]:text-red-200",
            "[&_.description]:text-red-600/80 dark:[&_.description]:text-red-300/80",
            "group-[.toast]:border-red-500/20",
          ].join(" "),
          warning: [
            "group-[.toaster]:bg-yellow-500/10",
            "group-[.toaster]:text-yellow-600",
            "group-[.toaster]:border-yellow-500/40",
            "dark:group-[.toaster]:bg-yellow-500/10",
            "dark:group-[.toaster]:text-yellow-400",
            "group-[.toast]:text-yellow-600 dark:group-[.toast]:text-yellow-200",
            "[&_.description]:text-yellow-600/80 dark:[&_.description]:text-yellow-300/80",
            "group-[.toast]:border-yellow-500/20",
          ].join(" "),
          info: [
            "group-[.toaster]:bg-blue-500/10",
            "group-[.toaster]:text-blue-500",
            "group-[.toaster]:border-blue-500/40",
            "dark:group-[.toaster]:bg-blue-500/10",
            "dark:group-[.toaster]:text-blue-400",
            "group-[.toast]:text-blue-600 dark:group-[.toast]:text-blue-200",
            "[&_.description]:text-blue-600/80 dark:[&_.description]:text-blue-300/80",
            "group-[.toast]:border-blue-500/20",
          ].join(" "),
        },
      }}
      {...props}
    />
  )
} 