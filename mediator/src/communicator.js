

class CommunicationService {
    static async sendRequest(payload) {
        let serviceUrlKey = `${payload.table.toUpperCase()}_SERVICE_URL`;
        let routePath = `${payload.table.toLowerCase()}s`;
        let endPoint = `${process.env[serviceUrlKey]}/${routePath}`;

        if (payload.action === 'create') {
            const response = await fetch(endPoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                return responseData;

            } else {
                throw new Error('Failed to create resource');
            }

        } else if (payload.action === 'get') {
            const response = await fetch(`${endPoint}/${payload.data.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const responseData = await response.json();
                return responseData;
            } else {
                throw new Error('Failed to fetch resource');
            }
        }
    }
}

module.exports = CommunicationService;