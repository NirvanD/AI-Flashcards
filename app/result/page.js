'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { CircularProgress, Typography, Container, Box } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            console.log(session_id)
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError("An error occured")
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography varrient="h6">Loading...</Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography varrient="h6">{error}</Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            {
                session.payment_status === "paid" ? (
                    <>
                        <Typography varrient="h4">Thank you for purchasing.</Typography>
                        <Box sx={{ mt: 22 }}>
                            <Typography varrient="h6">Session ID: {session_id}</Typography>
                            <Typography varrient="body1">We have recieved your payment. You will recieve an email with the order details shortly.</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography varrient="h4">Payment Failed.</Typography>
                        <Box sx={{ mt: 22 }}>
                            <Typography varrient="h6">Session ID: {session_id}</Typography>
                            <Typography varrient="body1">your payment was not successful. Please try again. </Typography>
                        </Box>
                    </>
                )
            }
        </Container>
    )
}

export default ResultPage