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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  File,
  Users,
  UserCheck,
  Award,
} from 'lucide-react';

// Reusable Card Component
const Card = ({ color, title, number, icon: Icon, subtitle }) => (
  <MuiCard
    sx={{
      p: 2.25,
      background: color,
      borderRadius: 1.5,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: 180,
    }}
  >
    <div>
      <Typography variant="subtitle2" sx={{ mb: 0.75, color: 'rgba(0,0,0,0.7)' }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 0.75, fontWeight: 'bold' }}>
        {number}
      </Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          {subtitle}
        </Typography>
      )}
    </div>
    <Icon size={30} style={{ opacity: 0.7 }} />
  </MuiCard>
);

// Generic Card Component
const GenericCard = ({ children, title, height = 'auto' }) => (
  <MuiCard
    sx={{
      p: 2.25,
      height: height !== 'auto' ? height * 0.75 : height,
      borderRadius: 1.5,
      boxShadow: '0 3px 4.5px -1px rgb(0 0 0 / 0.1)',
    }}
  >
    <Typography variant="subtitle2" sx={{ mb: 1.7, fontWeight: 'bold' }}>
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
    clients: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const casesRes = await fetch('backend/api/case/get-cases', { headers });
      const cases = await casesRes.json();

      const teamMembersRes = await fetch('backend/api/team-member/get-team-members', { headers });
      const teamMembers = await teamMembersRes.json();

      const clientsRes = await fetch('backend/api/client/get-client', { headers });
      const clients = await clientsRes.json();

      setAnalytics({
        cases: cases || [],
        teamMembers: teamMembers || [],
        clients: clients || [],
      });
    } catch (error) {
      setError('Failed to load analytics data');
      setAnalytics({
        cases: [],
        teamMembers: [],
        clients: [],
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
        monthlyStats: [],
      };
    }

    const monthlyStats = Array.from({ length: 6 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      return {
        name: month.toLocaleString('default', { month: 'short' }),
        cases: Math.floor(Math.random() * 10 + 5),
        clients: Math.floor(Math.random() * 8 + 3),
      };
    }).reverse();

    return {
      totalCases: analytics.cases.length,
      activeCases: analytics.cases.filter((c) => c && !c.endDate).length,
      totalClients: analytics.clients.length,
      totalTeamMembers: analytics.teamMembers.length,
      caseTypeDistribution: getCaseTypeDistribution(),
      teamPerformance: getTeamPerformanceData(),
      monthlyStats,
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
    return analytics.teamMembers.map((member) => ({
      name: member?.personalDetails?.name || 'Unknown',
      cases: analytics.cases.filter((c) => c && c.assignedTo === member._id).length,
    }));
  };

  if (loading) return <CircularProgress size={36} />;
  if (error) return <Typography variant="body2" color="error">{error}</Typography>;

  const metrics = calculateMetrics();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ p: 2.25, height: '100vh', overflow: 'auto' }}>
      <Grid container spacing={2.25} mb={3}>
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
          <Card color="#F4C7AC" title="Team Members" number={metrics.totalTeamMembers} icon={Users} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card color="#C0E1F8" title="Total Clients" number={metrics.totalClients} icon={UserCheck} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card color="#FFE4E1" title="Case Success Rate" number="85%" icon={Award} />
        </Grid>
      </Grid>

      <Grid container spacing={2.25}>
        <Grid item xs={12} md={8}>
          <GenericCard title="Case & Client Trends" height={300}>
            <ResponsiveContainer>
              <LineChart data={metrics.monthlyStats}>
                <XAxis dataKey="name" fontSize="75%" />
                <YAxis fontSize="75%" />
                <Tooltip wrapperStyle={{ fontSize: '75%' }} />
                <Legend wrapperStyle={{ fontSize: '75%' }} />
                <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={1.5} />
                <Line type="monotone" dataKey="clients" stroke="#82ca9d" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </GenericCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <GenericCard title="Case Type Distribution" height={300}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={Object.entries(metrics.caseTypeDistribution).map(([name, value]) => ({
                    name,
                    value,
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={75}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.entries(metrics.caseTypeDistribution).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip wrapperStyle={{ fontSize: '75%' }} />
              </PieChart>
            </ResponsiveContainer>
          </GenericCard>
        </Grid>
        <Grid item xs={12}>
          <GenericCard title="Team Performance">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '75%' }}>Team Member</TableCell>
                  <TableCell sx={{ fontSize: '75%' }} align="center">
                    Cases Handled
                  </TableCell>
                  <TableCell sx={{ fontSize: '75%' }} align="center">
                    Success Rate
                  </TableCell>
                  <TableCell sx={{ fontSize: '75%' }} align="right">
                    Performance Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.teamPerformance.map((member) => (
                  <TableRow key={member.name} hover>
                    <TableCell sx={{ fontSize: '75%' }}>{member.name}</TableCell>
                    <TableCell sx={{ fontSize: '75%' }} align="center">
                      {member.cases}
                    </TableCell>
                    <TableCell sx={{ fontSize: '75%' }} align="center">
                      {Math.floor(Math.random() * 20 + 80)}%
                    </TableCell>
                    <TableCell sx={{ fontSize: '75%' }} align="right">
                      <Typography
                        sx={{
                          color: 'success.main',
                          fontWeight: 'bold',
                          fontSize: '75%',
                        }}
                      >
                        {Math.floor(Math.random() * 200 + 800)}
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
