const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.page.setDefaultTimeout(10000); // Set default timeout to 10 seconds
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        this.timeAtWorkPunched = page.getByText('Time at WorkPunched');
        this.myActions = page.getByText('My Actions'); // Use partial text match
        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
        this.buzzPost = page.getByText('Buzz Latest Posts'); // Using partial text match
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' });
        this.searchBar = page.getByPlaceholder('Search');
        this.menuHideBtn = page.getByRole('button', { name: '' });

        //submenu options
        this.AdminSubMenu = page.getByRole('link', { name: 'Admin' });
        this.PIMSubMenu = page.getByRole('link', { name: 'PIM' });
        this.LeaveSubMenu = page.getByRole('link', { name: 'Leave' });
        this.TimeSubMenu = page.getByRole('link', { name: 'Time' });
        this.RecruitmentSubMenu = page.getByRole('link', { name: 'Recruitment' });
        this.MyInfoSubMenu = page.getByRole('link', { name: 'My Info' });
        this.PerformanceSubMenu = page.getByRole('link', { name: 'Performance' });
        this.DashboardSubMenu = page.getByRole('link', { name: 'Dashboard' });
        this.DirectorySubMenu = page.getByRole('link', { name: 'Directory' });
        this.MaintenanceSubMenu = page.getByRole('link', { name: 'Maintenance' });
        this.ClaimSubMenu = page.getByRole('link', { name: 'Claim' });
        this.BuzzSubMenu = page.getByRole('link', { name: 'Buzz' });
    }

    async validateDashboardHeader() {
        console.log(`[DashboardPage] Validating dashboard header...`);
        await expect(this.dashboardHeader).toBeVisible({ timeout: 10000 });
        await expect(this.dashboardHeader).toContainText('Dashboard');
        console.log(`[DashboardPage] Dashboard header validation completed.`);
    }

    async validateMyActions() {
        console.log(`[DashboardPage] Validating "My Actions"...`);
        await expect(this.myActions).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] "My Actions" validation completed.`);
    }

    async validateDashboardLink() {
        console.log(`[DashboardPage] Validating "Dashboard" link...`);
        await expect(this.dashboardLink).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] "Dashboard" link validation completed.`);
    }

    async validateBuzzPost() {
        console.log(`[DashboardPage] Validating "Buzz Latest Posts"...`);
        await expect(this.buzzPost).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] "Buzz Latest Posts" validation completed.`);
    }

    async validateOrangeHRMLogo() {
        console.log(`[DashboardPage] Validating "OrangeHRM Logo"...`);
        await expect(this.orangeHRMLogo).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] "OrangeHRM Logo" validation completed.`);
    }

    async validateSubMenuOptions() {
        console.log(`[DashboardPage] Validating submenu options...`);
        await expect(this.AdminSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Admin validation completed.`);
        await expect(this.PIMSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: PIM validation completed.`);
        await expect(this.LeaveSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Leave validation completed.`);
        await expect(this.TimeSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Time validation completed.`);
        await expect(this.RecruitmentSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Recruitment validation completed.`);
        await expect(this.MyInfoSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: My Info validation completed.`);
        await expect(this.PerformanceSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Performance validation completed.`);
        await expect(this.DashboardSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Dashboard validation completed.`);
        await expect(this.DirectorySubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Directory validation completed.`);
        await expect(this.MaintenanceSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Maintenance validation completed.`);
        await expect(this.ClaimSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Claim validation completed.`);
        await expect(this.BuzzSubMenu).toBeVisible({ timeout: 10000 });
        console.log(`[DashboardPage] Submenu option: Buzz validation completed.`);
    }
}

module.exports = DashboardPage;