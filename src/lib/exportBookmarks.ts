/**
 * Export bookmarks to different formats
 */

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  difficulty: string;
  tags: string[];
  created_at: string;
}

export function exportToJSON(resources: Resource[], filename = 'edukit-bookmarks.json') {
  const dataStr = JSON.stringify(resources, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  downloadFile(dataBlob, filename);
}

export function exportToCSV(resources: Resource[], filename = 'edukit-bookmarks.csv') {
  const headers = ['Title', 'Description', 'Link', 'Category', 'Difficulty', 'Tags', 'Date Added'];
  const rows = resources.map(r => [
    escapeCSV(r.title),
    escapeCSV(r.description),
    escapeCSV(r.link),
    escapeCSV(r.category),
    escapeCSV(r.difficulty),
    escapeCSV(r.tags.join(', ')),
    escapeCSV(new Date(r.created_at).toLocaleDateString()),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(dataBlob, filename);
}

export function exportToMarkdown(resources: Resource[], filename = 'edukit-bookmarks.md') {
  const content = [
    '# EduKit Africa - My Bookmarked Resources',
    '',
    `Exported on ${new Date().toLocaleDateString()}`,
    '',
    ...resources.map(r => {
      return [
        `## ${r.title}`,
        '',
        r.description,
        '',
        `- **Link**: [${r.link}](${r.link})`,
        `- **Category**: ${r.category}`,
        `- **Difficulty**: ${r.difficulty}`,
        r.tags.length > 0 ? `- **Tags**: ${r.tags.join(', ')}` : '',
        '',
        '---',
        '',
      ].filter(Boolean).join('\n');
    }),
  ].join('\n');

  const dataBlob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  downloadFile(dataBlob, filename);
}

function escapeCSV(str: string): string {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
