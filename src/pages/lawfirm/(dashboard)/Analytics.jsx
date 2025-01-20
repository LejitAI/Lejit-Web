import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card as MuiCard, 
  Typography, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { 
  File, 
  Users, 
  UserCheck,
  Activity,
  Calendar,
  Award,
  TrendingUp,
} from 'lucide-react';

// Reusable Card Component
const Card = ({ color, title, number, icon: Icon, subtitle }) => (
  <MuiCard sx={{ 
    p: 3, 
    background: color, 
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 240
  }}>
    <div>
      <Typography variant="h6" sx={{ mb: 1, color: 'rgba(0,0,0,0.7)' }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        {number}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          {subtitle}
        </Typography>
      )}
    </div>
    <Icon size={40} style={{ opacity: 0.7 }} />
  </MuiCard>
);

// Generic Card Component
const GenericCard = ({ children, title, height = "auto" }) => (
  <MuiCard sx={{ 
    p: 3, 
    height, 
    borderRadius: 2,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  }}>
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
      {title}
    </Typography>
    {children}
  </MuiCard>
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    cases: [],
    teamMembers: [],
    clients: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch data one by one to debug
      const casesRes = await fetch('backend/api/admin/get-cases', { headers });
      const cases = await casesRes.json();
      console.log('Cases response:', cases);

      const teamMembersRes = await fetch('backend/api/admin/get-team-members', { headers });
      const teamMembers = await teamMembersRes.json();
      console.log('Team members response:', teamMembers);

      const clientsRes = await fetch('backend/api/admin/get-client', { headers });
      const clients = await clientsRes.json();
      console.log('Clients response:', clients);

      setAnalytics({
        cases: cases || [],
        teamMembers: teamMembers || [],
        clients: clients || []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
      setAnalytics({
        cases: [],
        teamMembers: [],
        clients: []
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    if (!analytics || !analytics.cases) {
      return {
        totalCases: 0,
        activeCases: 0,
        totalClients: 0,
        totalTeamMembers: 0,
        caseTypeDistribution: {},
        teamPerformance: [],
        monthlyStats: []
      };
    }

    // Generate monthly stats for the line chart
    const monthlyStats = Array.from({ length: 6 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      return {
        name: month.toLocaleString('default', { month: 'short' }),
        cases: Math.floor(Math.random() * 10 + 5), // Replace with actual data
        clients: Math.floor(Math.random() * 8 + 3)  // Replace with actual data
      };
    }).reverse();
    
    return {
      totalCases: analytics.cases.length,
      activeCases: analytics.cases.filter(c => c && !c.endDate).length,
      totalClients: analytics.clients.length,
      totalTeamMembers: analytics.teamMembers.length,
      caseTypeDistribution: getCaseTypeDistribution(),
      teamPerformance: getTeamPerformanceData(),
      monthlyStats
    };
  };

  const getCaseTypeDistribution = () => {
    if (!analytics.cases || !Array.isArray(analytics.cases)) return {};
    return analytics.cases.reduce((acc, curr) => {
      if (curr && curr.caseType) {
        acc[curr.caseType] = (acc[curr.caseType] || 0) + 1;
      }
      return acc;
    }, {});
  };

  const getTeamPerformanceData = () => {
    if (!analytics.teamMembers || !Array.isArray(analytics.teamMembers)) return [];
    return analytics.teamMembers.map(member => ({
      name: member?.personalDetails?.name || 'Unknown',
      cases: analytics.cases.filter(c => c && c.assignedTo === member._id).length
    }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const metrics = calculateMetrics();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ p: 3 }}>
      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            color="#D4EED0"
            title="Total Cases"
            number={metrics.totalCases}
            icon={File}
            subtitle={`${metrics.activeCases} Active Cases`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            color="#F4C7AC"
            title="Team Members"
            number={metrics.totalTeamMembers}
            icon={Users}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            color="#C0E1F8"
            title="Total Clients"
            number={metrics.totalClients}
            icon={UserCheck}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            color="#FFE4E1"
            title="Case Success Rate"
            number="85%"
            icon={Award}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Monthly Trends */}
        <Grid item xs={12} md={8}>
          <GenericCard title="Case & Client Trends" height={400}>
            <ResponsiveContainer>
              <LineChart data={metrics.monthlyStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="New Cases"
                />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="New Clients"
                />
              </LineChart>
            </ResponsiveContainer>
          </GenericCard>
        </Grid>

        {/* Case Distribution */}
        <Grid item xs={12} md={4}>
          <GenericCard title="Case Type Distribution" height={400}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={Object.entries(metrics.caseTypeDistribution).map(([name, value]) => ({
                    name,
                    value
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.entries(metrics.caseTypeDistribution).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GenericCard>
        </Grid>

        {/* Team Performance */}
        <Grid item xs={12}>
          <GenericCard title="Team Performance">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell align="center">Cases Handled</TableCell>
                  <TableCell align="center">Success Rate</TableCell>
                  <TableCell align="right">Performance Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.teamPerformance.map((member) => (
                  <TableRow key={member.name} hover>
                    <TableCell>{member.name}</TableCell>
                    <TableCell align="center">{member.cases}</TableCell>
                    <TableCell align="center">
                      {Math.floor(Math.random() * 20 + 80)}% {/* Replace with actual data */}
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        sx={{ 
                          color: 'success.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {Math.floor(Math.random() * 200 + 800)} {/* Replace with actual data */}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GenericCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
