import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  FallbackComponent?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return !this.props.FallbackComponent ? (
        <>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </>
      ) : (
        this.props.FallbackComponent
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
