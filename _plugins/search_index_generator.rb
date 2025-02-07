require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      puts "Generating search index..."
      
      # Collect all wiki pages
      items = []
      site.collections['wiki'].docs.each do |doc|
        next if doc.data['is_category_index'] || doc.data['is_tag_index']
        
        puts "Processing: #{doc.url}"
        
        # Extract content without HTML and normalize whitespace
        content = doc.content.gsub(/<[^>]*>/, ' ')
                           .gsub(/\s+/, ' ')
                           .strip

        # Create search item
        item = {
          title: doc.data['title'],
          url: doc.url,
          category: doc.data['category'],
          summary: doc.data['summary'],
          content: content,
          difficulty: doc.data['difficulty'],
          tags: doc.data['tags'],
          weight: doc.data['weight']
        }

        items << item
      end

      # Write the search index file only to the destination
      dest_path = File.join(site.dest, 'search-index.json')
      
      puts "Writing search index to: #{dest_path}"
      
      # Generate pretty JSON
      search_index = JSON.pretty_generate(items)
      
      # Ensure the destination directory exists
      FileUtils.mkdir_p(File.dirname(dest_path))
      
      # Write to destination
      File.write(dest_path, search_index)
      
      puts "Search index generation complete!"
    end
  end
end 