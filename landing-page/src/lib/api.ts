const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  private headers(withAuth = true): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (withAuth) {
      const token = this.getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, options);
    const data = await res.json();
    if (!res.ok) throw { status: res.status, ...data };
    return data as T;
  }

  // ─── Auth ───────────────────────────────────────────────
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any; message: string }>('/auth/login', {
      method: 'POST',
      headers: this.headers(false),
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { name: string; email: string; password: string; role?: string }) {
    return this.request<{ token: string; user: any; message: string }>('/auth/register', {
      method: 'POST',
      headers: this.headers(false),
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.request<{ message: string }>('/auth/password', {
      method: 'PUT',
      headers: this.headers(true),
      body: JSON.stringify(data),
    });
  }

  // ─── Problems ───────────────────────────────────────────
  async getProblems(filters?: { difficulty?: string; topic?: string }) {
    const params = new URLSearchParams();
    if (filters?.difficulty) params.set('difficulty', filters.difficulty);
    if (filters?.topic) params.set('topic', filters.topic);
    const qs = params.toString();
    return this.request<any[]>(`/problems${qs ? `?${qs}` : ''}`, { headers: this.headers() });
  }

  async getProblem(id: string) {
    return this.request<any>(`/problems/${id}`, { headers: this.headers() });
  }

  async createProblem(data: any) {
    return this.request<any>('/problems', { method: 'POST', headers: this.headers(), body: JSON.stringify(data) });
  }

  async updateProblem(id: string, data: any) {
    return this.request<any>(`/problems/${id}`, { method: 'PUT', headers: this.headers(), body: JSON.stringify(data) });
  }

  async deleteProblem(id: string) {
    return this.request<any>(`/problems/${id}`, { method: 'DELETE', headers: this.headers() });
  }

  async bulkImportProblems(problems: any[]) {
    return this.request<any>('/problems/bulk', { method: 'POST', headers: this.headers(), body: JSON.stringify({ problems }) });
  }

  // ─── Aptitude ───────────────────────────────────────────
  async getAptitude(filters?: { category?: string; difficulty?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.set('category', filters.category);
    if (filters?.difficulty) params.set('difficulty', filters.difficulty);
    const qs = params.toString();
    return this.request<any[]>(`/aptitude${qs ? `?${qs}` : ''}`, { headers: this.headers() });
  }

  async createAptitude(data: any) {
    return this.request<any>('/aptitude', { method: 'POST', headers: this.headers(), body: JSON.stringify(data) });
  }

  async updateAptitude(id: string, data: any) {
    return this.request<any>(`/aptitude/${id}`, { method: 'PUT', headers: this.headers(), body: JSON.stringify(data) });
  }

  async deleteAptitude(id: string) {
    return this.request<any>(`/aptitude/${id}`, { method: 'DELETE', headers: this.headers() });
  }

  async bulkImportAptitude(questions: any[]) {
    return this.request<any>('/aptitude/bulk', { method: 'POST', headers: this.headers(), body: JSON.stringify({ questions }) });
  }

  async submitAptitude(submissions: any[]) {
    return this.request<any>('/aptitude/submit', { method: 'POST', headers: this.headers(), body: JSON.stringify({ submissions }) });
  }

  // ─── Companies ──────────────────────────────────────────
  async getCompanies() {
    return this.request<any[]>('/companies', { headers: this.headers() });
  }

  async createCompany(data: any) {
    return this.request<any>('/companies', { method: 'POST', headers: this.headers(), body: JSON.stringify(data) });
  }

  async updateCompany(id: string, data: any) {
    return this.request<any>(`/companies/${id}`, { method: 'PUT', headers: this.headers(), body: JSON.stringify(data) });
  }

  async deleteCompany(id: string) {
    return this.request<any>(`/companies/${id}`, { method: 'DELETE', headers: this.headers() });
  }

  // ─── Code Execution ────────────────────────────────────
  async runCode(data: { language: string; code: string; input?: string }) {
    return this.request<{ stdout: string; stderr: string; status: string; executionTime: string }>('/code/run', {
      method: 'POST', headers: this.headers(), body: JSON.stringify(data),
    });
  }

  async submitCode(data: { language: string; code: string; problem_id: string }) {
    return this.request<{
      verdict: string;
      total_tests: number;
      tests_passed: number;
      total_time: string;
      test_results: Array<{
        test_case: number;
        passed: boolean;
        input: string;
        expected_output: string;
        actual_output: string;
        stderr: string;
        execution_time: string;
        status: string;
      }>;
    }>('/code/submit', {
      method: 'POST', headers: this.headers(), body: JSON.stringify(data),
    });
  }

  // ─── Submissions ────────────────────────────────────────
  async createSubmission(data: any) {
    return this.request<any>('/submissions', { method: 'POST', headers: this.headers(), body: JSON.stringify(data) });
  }

  async getMySubmissions() {
    return this.request<any[]>('/submissions', { headers: this.headers() });
  }

  // ─── Analytics ──────────────────────────────────────────
  async getStudentProgress() {
    return this.request<any>('/users/progress', { headers: this.headers() });
  }

  async getAdminStats() {
    return this.request<any>('/admin/stats', { headers: this.headers() });
  }

  async getAdminUsers() {
    return this.request<any[]>('/admin/users', { headers: this.headers() });
  }

  // ─── User Profile ──────────────────────────────────────
  async getProfile() {
    return this.request<any>('/users/profile', { headers: this.headers() });
  }

  async updateProfile(data: { name?: string; college?: string; branch?: string; graduation_year?: number; phone?: string; linkedin?: string; github?: string }) {
    return this.request<any>('/users/profile', {
      method: 'PUT', headers: this.headers(), body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
