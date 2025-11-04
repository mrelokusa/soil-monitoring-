import { AIAnalysisResponse } from '../types';

const WEBHOOK_URL = 'https://arc325.app.n8n.cloud/webhook/alert-user';

/**
 * Formats the AI analysis data into a more human-readable and structured payload
 * suitable for notifications via n8n.
 * @param analysis - The raw AI analysis response.
 * @param email - The user's email for notifications.
 * @returns A formatted object for the webhook.
 */
const formatWebhookPayload = (analysis: AIAnalysisResponse, email: string | null) => {
    const priority = analysis.priority || 'Update';
    return {
        title: `ARC Smart Agriculture Alert: ${priority}`,
        summary: analysis.overall_summary,
        observations: analysis.observations.map(item => `- ${item}`).join('\n'),
        recommendations: analysis.recommendations.map(item => `- ${item}`).join('\n'),
        insights: analysis.cross_domain_insights?.map(item => `- ${item}`).join('\n') || 'No specific cross-domain insights.',
        priority: priority,
        email: email || 'Not provided',
        timestamp: new Date().toISOString(),
    };
}

/**
 * Sends the AI analysis to a specified webhook URL, but only if the priority
 * is 'Warning' or 'Critical'. This prevents sending notifications for normal conditions.
 * @param analysis - The AI analysis response object.
 * @param email - The user's email to include in the payload.
 */
export const sendAlertToWebhook = async (analysis: AIAnalysisResponse, email: string | null) => {
    // Only send alerts for non-normal priorities to avoid spam.
    const priority = (analysis.priority || 'normal').toLowerCase();
    if (priority === 'normal') {
        console.log('Analysis priority is Normal. Skipping webhook alert.');
        return;
    }

    const payload = formatWebhookPayload(analysis, email);

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Bypasses CORS preflight check for 'fire-and-forget' requests.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // With 'no-cors' mode, we cannot inspect the response.
        // We log success assuming the request was sent without a network error.
        console.log(`Successfully sent '${priority}' alert to webhook (fire-and-forget).`);

    } catch (error) {
        console.error('Error sending alert to webhook:', error);
        // We log the error but don't re-throw it, so the UI isn't affected.
    }
};