# 使用 Node.js的 Alpine 版本
FROM eooce/nav-item
COPY nav.db /app/database/nav.db
ENV NODE_ENV=production
EXPOSE 3000/tcp
CMD ["npm", "start"] 
