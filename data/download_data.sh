mkdir server/books
wget -i download_links.txt -P server/books/

# Normalize extensions (strip .utf-8 suffix)
for f in server/books/*.txt.utf-8;
do
  mv -- "$f" "${f%.txt.utf-8}.txt"
done