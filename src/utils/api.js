const BASE_API = "http://localhost:3001";

class Api {
    async leads() {
        const response = await fetch(`${BASE_API}/leads`);
        const lead = await response.json();
        return lead;
    }
    async deleteLead(id) {
        const response = await fetch(`${BASE_API}/leads/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });
        const lead = await response.json();
        return lead;
    }
    async createLead(body) {
        const response = await fetch(`${BASE_API}/leads`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
            },
        });
        const lead = await response.json();
        return lead;
    }
    async leadsId(id) {
        const response = await fetch(`${BASE_API}/leads/${id}`);
        const lead = await response.json();
        return lead;
    }
    async registry() {
        const response = await fetch(`${BASE_API}/registry`);
        const registry = await response.json();
        return registry;
    }
    async archive() {
        const response = await fetch(`${BASE_API}/archive`);
        const archive = await response.json();
        return archive;
    }
}

export default new Api();
