echo ""
echo "========== POST /feedbacks =========="
echo ""
time curl -X POST -i -H 'Content-Type: application/json' http://localhost:3005/feedbacks \
-d '{"type": "BUG", "comment" : "Tela de cliente, a tela de login não aparece."}'
echo ""
